---
title: "Building GPT from Scratch - Part 5: Tokenization"
date: "2025-08-08"
excerpt: ""
tags: ["transformers", "tutorial"]
---
*This is Part 5 of our GPT from scratch series. Having built and optimized our transformer in Parts 1-4, we now upgrade from character-level tokenization to modern subword tokenization using tiktoken.*

## What is Tokenization?

**Tokenization** is the process of breaking text into smaller units called *tokens*. A *tokenizer* handles this task and assigns each token a unique integer ID from its vocabulary. Andrej Karpathy gives a great overview of tokenization in [this lecture](https://www.youtube.com/watch?v=zduSFxRajkE).

## Tokenizer Vocabulary

The tokenizer's vocabulary is the full set of tokens it knows how to process. Tokenizers are *trained* on large text corpora—though this training differs from training a neural network. You can even train your own tokenizer and control its vocabulary size and tokenization rules.

## How Strings Are Tokenized

In English, tokens usually range from single characters to whole words—like `"t"` or `" great"`. Different languages and models may result in longer or shorter tokens. Most modern LLMs use *subword* tokenization methods, which balance vocabulary size with coverage of possible inputs. Some common tokenization algorithms include **Byte Pair Encoding (BPE)**, **WordPiece** and **Unigram**.

## Why Tokenization Matters

If your input text includes tokens *not* in the tokenizer's vocabulary, things can go wrong—often in frustrating or subtle ways. Many quirks and failures in LLM behavior can be traced back to poor or unexpected tokenization.

> Tokenization issues are a major source of bugs in LLM applications.

## Using Tiktoken

We'll use [`tiktoken`](https://github.com/openai/tiktoken/blob/main/README.md), OpenAI's fast, open-source tokenizer. Given a text (e.g., `"tiktoken is great!"`) and an encoding (e.g., `"cl100k_base"`), it produces a tokenized output like:

```python
["t", "ik", "token", " is", " great", "!"]
```

You can test tokenizations interactively using:

- [**OpenAI Tokenizer Tool**](https://beta.openai.com/tokenizer)
- [**Tiktokenizer Web App**](https://tiktokenizer.vercel.app/)

This is as simple as letting

```python
enc = tiktoken.encoding_for_model("gpt-2")
```

and then calling `enc.encode` and `enc.decode`.

## Scaling Challenges with Larger Vocabularies

Let's try `o200k_base`, which is used in `gpt-4o`. The vocab size is now 200,000 and our number of parameters in the model jumps to 164M! This is because the embedding and unembedding layers scale with the vocab size. Since `o200k_base` is too big, let's try the GPT-2 model which has a vocab size of around 50,000. Our model is now reduced to 50M parameters, still much bigger than what we had previously, with most of the weights in the embedding and unembedding layers. 

Currently, our dataset that we train on is small, so this is overkill. Most tokens probably don't even appear! We can see this disparity when we try to train the model:

```
step 0: train loss 10.8323, val loss 10.8315
step 500: train loss 4.8271, val loss 5.3269
step 1000: train loss 3.9008, val loss 4.8286
step 1500: train loss 3.3493, val loss 4.7968
step 2000: train loss 2.7602, val loss 4.9501
step 2500: train loss 2.1606, val loss 5.2748
step 3000: train loss 1.4815, val loss 5.7240
```

The validation loss is terrible, i.e. next token prediction is bad. Note that our tokens no longer correspond to individual characters. The training loss keeps going down since we now have an even more extreme example of overfitting to the data with increased parameters. 

## Improved Text Generation

Interestingly, the output is still quite readable since tokens are sub-word and not character level, showing the advantage of an increased vocabulary:

```
what stay to-morrow! I must desire her:
Hard shrowa thousand pound a book
Our friend. The one cockues!

FLORDS:
Ay, good testimony, come.

Servant:
My lord!

MIONwell, my lord, the heavens to cry't: look down,
And occupations speak again, I do come on,
Is't speak to see you. All my lord--
Alack, your lords! my lords, who, I have
Upon my heart:--your convey him, my lord,
Mowius; from my blood against your hand,
Out on your stables there! O injurious sin!

ISABELLHORIZELO:
Stay, good heaven;
My soul is some good's liver for her true self,
Whose settled good edencing trade here.
```

Despite the overfitting issues, the subword tokenization produces more natural-sounding text compared to our character-level approach. Words are more complete and the overall flow is more coherent.

## Key Takeaways

We have improved the tokenization part of our model, but we need to train on a larger dataset to properly utilize the expanded vocabulary. The main insights from this upgrade:

1. **Modern tokenization** uses subword algorithms that balance vocabulary efficiency with coverage
2. **Vocabulary size directly impacts model parameters** - larger vocabularies mean more embedding parameters
3. **Dataset size must match vocabulary size** - small datasets can't effectively train large vocabularies
4. **Subword tokens produce more natural text** even when the model is overfitting

In the next section, we'll address the dataset limitation by training on a much larger corpus to properly leverage our improved tokenization.