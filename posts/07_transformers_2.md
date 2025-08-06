---
title: "Building GPT from Scratch - Part 2: The Attention Mechanism"
date: "2025-08-05"
excerpt: ""
tags: ["transformers", "tutorial"]
---
*This is Part 2 of a 3-part series on building a Generative Pretrained Transformer from scratch. In Part 1, we built a simple bigram model. Now we'll introduce the core innovation that makes transformers work: Attention.*

## The Mathematical Foundation: Weighted Aggregation

Before diving into attention, let's understand a neat mathematical trick that forms its foundation. By multiplying a row-normalized T×T lower triangular matrix with a T×C matrix, we can get a T×C matrix which calculates a running average of the preceding rows.

When we combine this with softmax (setting -inf instead of 0), we get a more general weighted aggregation of past elements:

```python
# Weighted aggregation with softmax
torch.manual_seed(1337)
B,T,C = 4,8,2
x = torch.randn(B,T,C)

tril = torch.tril(torch.ones(T,T)) # lower triangular
wei = torch.zeros((T,T))
wei = wei.masked_fill(tril==0, float('-inf'))
wei = F.softmax(wei, dim=-1)
res = wei @ x
res.shape
```

This is the mathematical foundation of attention - we're learning to compute weighted averages of past tokens, where the weights are determined by the content of the tokens themselves.

## Single Head Self-Attention

Now for the meat of transformers: the attention mechanism. We create an attention space of dimension 'head_size'. We project each token into this space using three matrices: **Key (K)**, **Query (Q)**, and **Value (V)**.

Here's the intuition:
- **Query (Q)**: What the token is looking for
- **Key (K)**: What the token contains/offers
- **Value (V)**: What the token communicates if paid attention to

When K and Q are similar (measured using dot product), they have high affinity and receive higher attention weights. We don't aggregate tokens directly - we aggregate V(X), which represents what each token communicates when attended to.

The normalization by 1/√(head_size) is crucial. When Q and K have unit variance, this ensures the attention weights also have unit variance. Without this normalization, softmax would saturate towards one-hot vectors, meaning tokens would only aggregate information from a single previous token.

```python
class Head(nn.Module):
    """ one head of self-attention """

    def __init__(self, head_size):
        super().__init__()
        self.key = nn.Linear(n_embd, head_size, bias=False)
        self.query = nn.Linear(n_embd, head_size, bias=False)
        self.value = nn.Linear(n_embd, head_size, bias=False)
        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))

    def forward(self, x):
        # input of size (batch, time-step, channels)
        # output of size (batch, time-step, head size)
        B,T,C = x.shape
        k = self.key(x)   # (B,T,hs)
        q = self.query(x) # (B,T,hs)
        # compute attention scores ("affinities")
        wei = q @ rearrange(k, 'b t h -> b h t') * C**-0.5
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf')) # (B, T, T)
        wei = F.softmax(wei, dim=-1) # (B, T, T)
        # perform the weighted aggregation of the values
        v = self.value(x) # (B,T,hs)
        out = wei @ v # (B, T, T) @ (B, T, hs) -> (B, T, hs)
        return out
```

Note that we register 'tril' as a buffer since it's not a learnable parameter of the model.

## Important Notes About Attention

Here are some crucial points about how attention works:

- **Note 1**: Attention is a communication mechanism. You have a directed graph and you want every node to take weighted sums of every node pointing to it.

- **Note 2**: Positional encoding must be embedded in the nodes, since the structure of the attention mechanism doesn't inherently understand position.

- **Note 3**: Batches are independent - there's no cross-communication between different sequences in a batch.

- **Note 4**: Here we ignore future tokens using triangular masking. If you were doing sentiment analysis, you might want to allow this communication. Encoder blocks would allow bidirectional attention, decoder blocks would not. The difference is just the triangular masking.

- **Note 5**: This is called "self-attention" because K, Q, V all come from the same input X. If the keys and values came from somewhere else, you'd have "cross-attention", which is used when there's a separate source of information to pull from.

## Building the Complete Single-Head Model

Let's put everything together into a complete model with single-head attention. We'll make several improvements to our training setup:

```python
# hyperparameters
batch_size = 32
block_size = 8 
max_iters = 5000
eval_interval = 500
learning_rate = 1e-3
device = 'cuda' if torch.cuda.is_available() else 'cpu'
eval_iters = 200
n_embd = 32
torch.manual_seed(1337)

# data loading
def get_batch(split):
    # generate a small batch of data of inputs x and targets y
    data = train_data if split == 'train' else val_data
    ix = torch.randint(len(data) - block_size, (batch_size,))
    x = torch.stack([data[i:i+block_size] for i in ix])
    y = torch.stack([data[i+1:i+block_size+1] for i in ix])
    x, y = x.to(device), y.to(device)
    return x, y

@torch.no_grad()
def estimate_loss():
    out = {}
    model.eval()
    for split in ['train', 'val']:
        losses = torch.zeros(eval_iters)
        for k in range(eval_iters):
            X, Y = get_batch(split)
            logits, loss = model(X, Y)
            losses[k] = loss.item()
        out[split] = losses.mean()
    model.train()
    return out
```

Key improvements in this version:

1. **GPU Support**: We move data and model to GPU using 'device = 'cuda''
2. **Better Loss Estimation**: 'estimate_loss()' averages losses over multiple batches for more accurate estimates
3. **No Gradient Context**: '@torch.no_grad()' tells PyTorch this function won't be backpropagated through
4. **Embedding Dimension**: Our logits are now embedded in an embedding dimension, so we need an "unembedding" linear layer
5. **Positional Embeddings**: We add position information so tokens know where they are in the sequence

```python
class GPTLanguageModel(nn.Module):

    def __init__(self, vocab_size):
        super().__init__()
        # each token directly reads off the logits for the next token from a lookup table
        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)
        self.position_embedding_table = nn.Embedding(block_size, n_embd)
        self.sa_head = Head(n_embd)
        self.lm_head = nn.Linear(n_embd, vocab_size)

        # better init, not covered in the original GPT video, but important
        self.apply(self._init_weights)
    
    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)

    def forward(self, idx, targets=None):
        B, T = idx.shape

        # idx and targets are both (B,T) tensor of integers
        tok_emb = self.token_embedding_table(idx) # (B,T,C)
        pos_emb = self.position_embedding_table(torch.arange(T, device=device)) # (T,C)
        x = tok_emb + pos_emb # (B,T,C)
        x = self.sa_head(x)
        logits = self.lm_head(x)

        if targets is None:
            loss = None
        else:
            B, T, C = logits.shape
            logits = logits.view(B*T, C)
            targets = targets.view(B*T)
            loss = F.cross_entropy(logits, targets)

        return logits, loss

    def generate(self, idx, max_new_tokens):
        # idx is (B, T) array of indices in the current context
        for _ in range(max_new_tokens):
            # crop idx to the last block_size tokens
            idx_cond = idx[:, -block_size:]
            # get the predictions
            logits, loss = self(idx_cond)
            # focus only on the last time step
            logits = logits[:, -1, :] # becomes (B, C)
            # apply softmax to get probabilities
            probs = F.softmax(logits, dim=-1) # (B, C)
            # sample from the distribution
            idx_next = torch.multinomial(probs, num_samples=1) # (B, 1)
            # append sampled index to the running sequence
            idx = torch.cat((idx, idx_next), dim=1) # (B, T+1)
        return idx
```

## Results with Single-Head Attention

After training, we get improved results that show more structure, though still not quite Shakespeare:

```
Arrg hor; ho, ho aak.

LUCKUCARE Fqhelree ndel te:
Thece waplt ko.
FOCI
MHABRIEKY tur waverer orid betievis dyof b.

Bo,
ABIUCE:
N-, evesune athid nt cobasr!, Go hern, alsemin rsin varit ther I;
ANher en:ouingaroua lis py Bh mithe ast prird band bad youun theis pioat hed man ile ere sty hanonoue avillars d ty hon I:
So Ilar chy w'guma my tono yat d,
I more hathive, ha utithe baag tee
Iile athadog at y hoke hay hate whinsintoourtarenol usdon co whe sou; mer wif yoh hlele coud illesen?o I choteban
```

The attention mechanism has given our model the ability to look back at previous characters and make more informed predictions. We can see more English-like structure emerging.

## Multi-Head Attention

Instead of using a single attention head, we can use multiple smaller heads in parallel. This allows the model to attend to different types of relationships simultaneously - some heads might focus on syntax, others on semantics, etc.

```python
class MultiHeadAttention(nn.Module):
    """ multiple heads of self-attention in parallel """

    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])

    def forward(self, x):
        return torch.cat([h(x) for h in self.heads], dim=-1)
```

In our model, we replace the single head with:
```python
self.sa_head = MultiHeadAttention(4, n_embd//4)
```

This gives us slightly better loss and more diverse attention patterns.

## What's Next?

We now have a working attention mechanism! However, our model is still missing several key components that make modern transformers work well:

- **Feed-forward networks** for computation after attention
- **Transformer blocks** that repeat the attention + computation pattern
- **Residual connections** and **layer normalization** for training stability
- **Dropout** for regularization

In Part 3, we'll add these final components and see our model start generating much more coherent text. The attention mechanism we've built here is the foundation - everything else builds on top of it to create the full transformer architecture.