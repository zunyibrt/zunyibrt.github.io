---
title: "Building GPT from Scratch - Part 3: Building the Complete Transformer"
date: "2025-08-06"
excerpt: ""
tags: ["transformers", "tutorial"]
---
*This is Part 3 of a 3-part series on building a Generative Pretrained Transformer from scratch. In Parts 1 and 2, we built the data pipeline and attention mechanism. Now we'll complete our transformer with the remaining key components.*

## Feed-Forward Networks

After our attention mechanism learns to communicate between tokens, we need to give the model computation time to process what it has learned. This is where feed-forward networks come in - they're simply MLPs with ReLU activation that allow the model to "think" about the information it just gathered.

```python
class FeedFoward(nn.Module):
    """ a simple linear layer followed by a non-linearity """

    def __init__(self, n_embd):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, n_embd),
            nn.ReLU(),
        )

    def forward(self, x):
        return self.net(x)
```

We add this to our model after the attention:

```python
# In our model:
self.sa_head = MultiHeadAttention(4, n_embd//4)
self.ffwd = FeedFoward(n_embd) # MLP with RELU

# In forward pass:
x = self.sa_head(x)
x = self.ffwd(x)
logits = self.lm_head(x)
```

## Transformer Blocks: Communication + Computation

The pattern of attention (communication) followed by feed-forward (computation) is so fundamental that we package it into reusable **Transformer Blocks**. These blocks can be stacked to create deeper networks that alternate between communication and computation phases.

```python
n_head = 4
n_layer = 2

class Block(nn.Module):
    """ Transformer block: communication followed by computation """

    def __init__(self, n_embd, n_head):
        # n_embd: embedding dimension, n_head: the number of heads we'd like
        super().__init__()
        head_size = n_embd // n_head
        self.sa = MultiHeadAttention(n_head, head_size)
        self.ffwd = FeedFoward(n_embd)

    def forward(self, x):
        x = self.sa(x)
        x = self.ffwd(x)
        return x
```

We can then stack multiple blocks:

```python
# In our model:
self.blocks = nn.Sequential(*[Block(n_embd, n_head=n_head) for _ in range(n_layer)])

# In forward pass:
x = tok_emb + pos_emb # (B,T,C)
x = self.blocks(x)
logits = self.lm_head(x)
```

At this point, our model starts generating recognizable English words!

```
RILELE
MAssell use you.
Nt I RYan lake off.

Ficink'd
hote carewtledeche quie to whanl Gatt Mejesery ely:
The if, bet leveses it theave be ry skit you file.

Kay wred tome dake stance, suks,
Adech JORo!

ALOUSBET:
Wis brake grourst and ald creapsss,
Andite
noat,
Amothery are doreast is
```

## Training Optimizations

As our network gets deeper with multiple transformer blocks, we need optimizations to improve training stability and performance.

### Residual Connections

The first optimization is **residual/skip connections**, introduced in the [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) paper. These connections allow gradients to flow directly through the network, avoiding training bottlenecks in deep networks.

Instead of 'x = self.sa(x)', we do 'x = x + self.sa(x)'. The computation now returns a residual that gets added to the original input:

```python
class Block(nn.Module):
    def forward(self, x):
        x = x + self.sa(x)  # residual connection
        x = x + self.ffwd(x)  # residual connection
        return x
```

### Projection Layers

We also add projection layers to map back to the embedding space after our multi-head attention and expand our feed-forward networks as in the original paper:

```python
class MultiHeadAttention(nn.Module):
    """ multiple heads of self-attention in parallel """

    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])
        self.proj = nn.Linear(head_size * num_heads, n_embd)

    def forward(self, x):
        out = torch.cat([h(x) for h in self.heads], dim=-1)
        out = self.proj(out)
        return out

class FeedFoward(nn.Module):
    """ a simple linear layer followed by a non-linearity """

    def __init__(self, n_embd):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),  # expand by 4x as in the paper
            nn.ReLU(),
            nn.Linear(4 * n_embd, n_embd),  # project back down
        )

    def forward(self, x):
        return self.net(x)
```

### Layer Normalization

Layer normalization helps stabilize training by normalizing inputs to have zero mean and unit variance. We apply it before both the self-attention and feed-forward computations in each block, and once more after all blocks:

```python
class Block(nn.Module):
    """ Transformer block: communication followed by computation """

    def __init__(self, n_embd, n_head):
        super().__init__()
        head_size = n_embd // n_head
        self.sa = MultiHeadAttention(n_head, head_size)
        self.ffwd = FeedFoward(n_embd)
        self.ln1 = nn.LayerNorm(n_embd)
        self.ln2 = nn.LayerNorm(n_embd)

    def forward(self, x):
        x = x + self.sa(self.ln1(x))
        x = x + self.ffwd(self.ln2(x))
        return x
```

### Dropout

Finally, we add **dropout** for regularization, which randomly sets some activations to zero during training to prevent overfitting:

```python
class FeedFoward(nn.Module):
    def __init__(self, n_embd):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.ReLU(),
            nn.Linear(4 * n_embd, n_embd),
            nn.Dropout(dropout),  # add dropout
        )

class MultiHeadAttention(nn.Module):
    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])
        self.proj = nn.Linear(head_size * num_heads, n_embd)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        out = torch.cat([h(x) for h in self.heads], dim=-1)
        out = self.dropout(self.proj(out))
        return out
```

## Final Model and Hyperparameters

We now have a complete decoder-only transformer ready to scale and train! Here are the hyperparameters for our final model:

```python
# hyperparameters
batch_size = 32
block_size = 32
max_iters = 5000
eval_interval = 500
learning_rate = 3e-4
eval_iters = 200
n_embd = 64
n_head = 6
n_layer = 6
dropout = 0.2
```

## Final Results

After training our complete transformer, we get much more structured output:

```
DOF GlLN:
They good, then then, bladgy bone not thindnes
I way Jeain, fainly!

ISABELLA:
I way, thou fourd to havary flown dews'm-sine.

NowZALLET:
Which here old thy's warring hiod
On dearys hory be wive to more; greseli!

But nighd Wart, prance:
Barch,
And prayem not welld she you, coldinger:
O I the oldst God somed:
Sirry is let never To be whith, I new'n be thy limpiny
Word: where deblitiss for give upon the conqueennifult,
And so pobeterl. by they she thy truge,
If you his let a brotess.
```

While still not perfect, the improvement is dramatic! The model now:
- Uses proper character names (ISABELLA, etc.)
- Maintains somewhat consistent dramatic structure
- Shows more coherent word formation
- Demonstrates longer-range dependencies

## What We've Accomplished

In this three-part series, we've built a complete transformer from scratch:

1. **Part 1**: Data loading, tokenization, and a simple bigram baseline
2. **Part 2**: The attention mechanism - the core innovation of transformers
3. **Part 3**: Complete transformer architecture with all the essential components

### Key Components We've Implemented:

- **Self-attention mechanisms** for learning relationships between tokens
- **Multi-head attention** for capturing different types of relationships
- **Feed-forward networks** for computation after communication
- **Transformer blocks** that stack attention and computation
- **Residual connections** for stable training of deep networks
- **Layer normalization** for training stability
- **Positional embeddings** so the model understands sequence order
- **Dropout** for regularization and preventing overfitting

## The Path Forward

Our small transformer demonstrates the core principles, but to achieve GPT-level performance, you'd need to scale up significantly:

- **More parameters**: Modern language models have billions of parameters
- **More data**: Training on much larger text corpora
- **More compute**: Training for weeks or months on powerful hardware
- **Better tokenization**: Using subword tokenizers like BPE or SentencePiece
- **Longer context windows**: Supporting much longer sequences

## Key Takeaways

1. **Attention is the core innovation**: The self-attention mechanism allows tokens to communicate and share information based on content rather than just position.

2. **Transformers are surprisingly simple**: The architecture is just attention + feed-forward blocks stacked together with some normalization and residual connections.

3. **Scale matters**: The same architecture that gives us semi-coherent Shakespeare can generate human-level text when scaled up with more parameters, data, and compute.

4. **Training stability is crucial**: Residual connections, layer normalization, and proper weight initialization are essential for training deep networks.

## Conclusion

This tutorial has shown how to build a transformer model from scratch using PyTorch. We've implemented all the key components of the decoder transformer architecture and seen how they work together to create a language model capable of generating structured text.

The progression from random gibberish (bigram model) to semi-coherent Shakespeare-like text (full transformer) demonstrates the power of the attention mechanism and proper architectural choices. While our small model doesn't generate fully coherent text yet, scaling up the parameters, training data, and computation would lead to increasingly capable language models.

The complete nanoGPT implementation, with additional optimizations and the ability to train larger models, can be found in [Andrej Karpathy's repository](https://github.com/karpathy/nanoGPT). This serves as an excellent foundation for understanding and experimenting with transformer architectures.