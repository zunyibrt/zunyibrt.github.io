---
title: "Mech Interp: Toy Models Part I"
date: "2025-07-11"
excerpt: ""
tags: ["mech interp"]
---

This is a pretty long paper, and is divided into 12 sections (although the last 3 are discussion, related work and comments).

## Section 1: Background & Motivation

The first section provides an introduction and summary of the main results in this paper. They begin by mentioning that it would be nice if each neuron had a one to one correspondence with a specific feature such as dog’s snout. This has been shown empirically to sometimes happen, but this is not always the case especially in LLMs. So the motivating question is when and why this happens (or doesn’t happen). By using toy models which are small ReLU networks trained to learn five features of varying importance and varying sparsity, they show that models can store more features than they have dimensions (**superposition**), and they can even perform computations in this superposed state. They hypothesize that the small networks simulate large sparse networks.

This seems like an interesting way to view superposition —- as a way of compressing information through continuous representation, but also as a computation mechanism (cue the name superposition and some possible relation to QM). When they say `no interference', this is what I think of as a circuit, with each neuron activating on, and only on, specific features.

They go on to say the main contribution is that they directly demonstrate superposition occurs relatively natural and offer a theory (phase diagram!) of when this happens. They make lots of parallels to physics phenomena, which I am excited to read given my physics background. There is an interesting note for example, that superposition organizes features into geometric structures, which immediately signals to be some kind of energy (loss function) minimizing geometries. They have not defined **sparsity** yet, although they discuss it, but I’m sure that is coming next. 

## Section 1b: Definitions and Motivation: Features, Directions, and Superposition

The next part of this section kicks off by discussing the Linear Representation Hypothesis ([see here](https://arxiv.org/abs/2311.03658)), which is the idea that certain directions in a representation space correspond to specific high level concepts, in other words that they carry semantic meaning. The claim that these are linear also seems important since that makes them easy to compose and decompose, and even to do vector arithmetic. This is more an empirical observation, e,g, see Mikolov et al for a famous example in word embeddings.

In their words, ‘features of the input’ are captured as ‘directions in activation space’. If we can figure out these vector representations, we can decompose activations into something we can more easily understand — as a basis of concepts each activated with a certain strength. 

One natural basis in a neural network by virtue of its structure is having each neuron correspond to one feature. Naturally this would be limited to the number of neurons you have (This is a privileged basis, and there are incentives to used this basis such as activation functions, but this doesn’t mean that the basis will be used)! However, if you have more features than neutrons, a different strategy is required. This is where the idea of superposition comes in, where the features are captured by a certain direction in the high dimensional input space. I assume this is akin to creating a non-orthogonal basis. 

There is some interesting discussion of what actually constitutes a feature, since `concept' is a pretty vague word. They settle on defining it as a property which will be an individual neuron in a sufficiently large network for the same problem. Does this mean that any neural network that exhibits superposition has an equivalent much larger neural network that works in the basis where each neuron is one feature? What implications does that have for discrete valued/low bit neural networks? What are the trade offs for being able to do this network compression?

Next, a strong case is made for linear representations, of which I like the argument that linear representations make features linearly accessible, meaning that since neural network layers are linear functions followed by a non-linearity, a feature must be linear in order for a neuron to consistently excite or inhibit on that feature in a single step. 

Lastly, there is more discussion on **the superposition hypothesis**, which I think is the core of this paper.  Basically, if a neural network needs to represent more features than there are neurons, features can’t align with the basis and hence polysemanticity (single neuron represents to multiple geatures) is unavoidable. While you can only have n orthogonal vectors in n dimensions, you can have an exponential exp(n) almost orthogonal vectors. So for large-n, this would be very efficient at cramming more features in than neurons! The cost is that each feature activating creates some small amount of noise by making it looks as some other features slightly activating. 

The other big idea here is that sparsity is important. From compressed sensing, it is generally difficult to reconstruct a high dimensional vector projected into a low dimensional space since information is lost, but it is possible if you can assume the original vector is sparse. So sparsity here means that activations don’t happen together, and that means this `noise' is minimized. If the activations are not sparse, multiple present features will interfere.

Again the hypothesis is that small networks with polysemanticity are low dimensional projections of larger networks. The requirements for this to be effective seem pretty strict, so it would nice to be able to better quantify them and to understand how important this is in most networks.