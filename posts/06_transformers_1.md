---
title: "Building GPT from Scratch - Part 1: Data Loading and the Bigram Model"
date: "2025-08-04"
excerpt: ""
tags: ["transformers", "tutorial"]
---

*This is Part 1 of a 3-part series on building a Generative Pretrained Transformer from scratch, based on Andrej Karpathy's excellent tutorial.*

## Introduction

The goal of this series is to build a 'Generative Pretrained Transformer' from scratch, following the attention architecture from the original 2017 [**Attention is all you need**](https://arxiv.org/abs/1706.03762) paper and OpenAI's GPT-2. We'll be building a character-level generative model - essentially a next character predictor that can generate Shakespeare-like text.

This tutorial is based on Andrej Karpathy's video [**Let's build GPT: from scratch, in code, spelled out**](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=10s), which has gained 6 million views in 2 years! Transformers get their name from their original use case of machine translation.

## Data Loading

The first step in building any language model is preparing our data. We'll use the tiny Shakespeare dataset for this tutorial.

```python
# Download tiny shakespeare dataset
!wget https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt

# read and inspect the file
with open('input.txt', 'r') as f:
  text = f.read()
print("Length of dataset in characters: ", len(text))
print(text[:1000])
```

### Tokenization

The first interesting concept is **tokenization**. We want to convert our input text into integers that our model can work with. The model will predict the next integer, which we can then decode back into a character.

Our simple approach creates a dictionary of all available characters (including newline) and assigns each an integer. For more sophisticated treatments, you'd want to look at SentencePiece by Google or tiktoken by OpenAI. There's always a tradeoff between dictionary size and encoding lengths.

```python
chars = sorted(list(set(text)))
vocab_size = len(chars)
print(f"{vocab_size} characters in dictionary : {''.join(chars)}")
# First one is a new line!

# Create a mapping from characters to integers (A Tokenizer)
# This is called tokenizing. Google uses SentencePiece. OpenAI and GPT uses tiktoken
itos = { i:ch for i, ch in enumerate(chars)}
stoi = { ch:i for i, ch in enumerate(chars)}
encode = lambda s: [stoi[c] for c in s] # encoder: convert string to list of integers
decode = lambda l: ''.join([itos[i] for i in l]) # decoder: convert list of integers to string

# Now encode the whole text dataset and store it as a pytorch Tensor
import torch
data = torch.tensor(encode(text), dtype=torch.long)
print(data.shape, data.dtype)
print(data[:100])
print(decode([int(v) for v in (data[:100].data)]))

# Split the data into training and validation sets
n = int(0.9*len(data))
train_data = data[:n]
val_data = data[n:]
```

### Block Size and Context Windows

The second important concept is **block size**, which sets the context window length. This is the size of the 'memory' of the model. A larger block size would give more long-range associations, but is probably more expensive to train and would require more data.

With block size defined, we can input batch_size rows of block_size integers for each data batch. Training in batches is faster since multiple independent blocks can be processed simultaneously.

```python
block_size = 8 # or alternatively context lengths
train_data[:block_size+1]
# in a sample of 9 characters, we have 8 examples with different context lengths.

torch.manual_seed(1337)
batch_size = 4
block_size = 8

def get_batch(split):
  # generate a small batch of data of inputs x and targets y
  data = train_data if split == 'train' else val_data
  ix = torch.randint(len(data) - block_size , (batch_size,)) # should have a -1
  x = torch.stack([data[i:i+block_size] for i in ix])
  y = torch.stack([data[i+1:i+1+block_size] for i in ix])
  return x, y
```

## The Bigram Model

Now let's implement our first model - a simple bigram model. This model predicts the next character based only on the current character (context length of 1) and stores probabilities for the next character.

We use a log-likelihood/cross-entropy loss. Initially, we expect the loss to be around ln(1/65) ≈ 4.17, since we have 65 characters and initially each character should be equally likely.

```python
import torch.nn as nn
from torch.nn import functional as F
torch.manual_seed(1337)
from einops import rearrange

class BigramLanguageModel(nn.Module):

  def __init__(self, vocab_size):
    super().__init__() # initialize the parent class Module
    # each token directly reads off the logits for the next token from a lookup table
    self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)

  def forward(self, idx, targets=None):
    # idx and targets and both (B,T) tensors of integers
    logits = self.token_embedding_table(idx) # (B,T,C) batch time channel

    if targets is None:
      loss = None
    else:
      logits = rearrange(logits,'b t c -> (b t) c')
      targets = rearrange(targets, 'b t -> (b t)')
      loss = F.cross_entropy(logits, targets)

    return logits, loss

  def generate(self, idx, max_new_tokens):
    # idx is (B, T) array of indicies in the current context
    for _ in range(max_new_tokens):
      # get the predictions
      logits, loss = self(idx)
      # focus only on last time step
      logits = logits[:, -1 , :] # becomes B x C
      # apply softmax to get probabilties
      probs = F.softmax(logits, dim=1) # becomes B x C
      # sample from distribution
      idx_next = torch.multinomial(probs, num_samples=1) # B x 1
      # append sampled index to running sequence
      idx = torch.cat((idx, idx_next), dim=1) # B x T+1
    return idx

m = BigramLanguageModel(vocab_size)
logits, loss = m(xb, yb)
print(logits.shape)
print(loss)

idx = torch.zeros((1,1), dtype=torch.long)
print(decode(m.generate(idx, max_new_tokens=100)[0].tolist()))
```

Note that for PyTorch, when we subclass 'nn.Module', calling the model (including 'self') actually calls the 'forward' method!

## Training the Bigram Model

We can train our model by choosing an **optimizer** and a **learning rate**. A good learning rate is typically 1e-3, but for smaller networks you can get away with higher rates.

```python
# training
batch_size = 32

optimizer = torch.optim.AdamW(m.parameters(), lr=1e-3)

for steps in range(10000):
  # sample a batch of data
  xb, yb = get_batch('train')

  logits, loss = m(xb, yb)
  optimizer.zero_grad(set_to_none=True)
  loss.backward()
  optimizer.step()

print(loss.item())
```

## Results

Unfortunately, the results using the bigram model aren't great:

```
Iyoteng h hasbe pave pirance
Rie hicomyonthar's
Plinseard ith henoure wounonthioneir thondy, y heltieiengerofo'dsssit ey
KIN d pe wither vouprrouthercc.
hathe; d!
My hind tt hinig t ouchos tes; st yo
# Not quite Shakespeare
```

The bigram model is too simple - it can only look at one character back to predict the next. We need something more sophisticated that can consider longer context windows and learn more complex patterns.

## What's Next?

In the next part of this series, we'll introduce the key mathematical trick that makes transformers possible: the attention mechanism. We'll start with a mathematical foundation for weighted aggregation and build up to single-head self-attention.

The bigram model gives us a solid foundation to build upon, and more importantly, it establishes our training pipeline and data handling. Now we're ready to dive into the real magic of transformers!