---
title: "Building GPT from Scratch - Part 6: Pretraining and Finetuning"
date: "2025-08-11"
excerpt: ""
tags: ["transformers", "tutorial"]
---
*This is Part 6 of our GPT from scratch series. Having upgraded to modern tokenization in Part 5, we now tackle the data limitation by training on a much larger corpus and exploring pretraining + finetuning.*

## Training on a Larger Corpus

Since we have a larger model, we now want to train on a larger dataset. I'm still interested in generating poems, so let's use this [poetry dataset from Kaggle](https://www.kaggle.com/datasets/tgdivy/poetry-foundation-poems) which gives us a CSV file containing a list of poems from [Poetry Foundation](https://www.poetryfoundation.org/). 

We first have to do some data cleaning with pandas to get the newline Unicode characters consistent, and concatenate all the poems into a single text file.

```
Line terminators found in the poems:
----------------------------------------
Mac Classic (\r only): 417494 occurrences
Double CR + LF (\r\r\n): 379146 occurrences
Windows (\r\n): 379146 occurrences
Reversed (\n\r): 19556 occurrences
Double CR (\r\r): 10527 occurrences
Line Separator (U+2028): 419 occurrences
Paragraph Separator (U+2029): 1 occurrences
----------------------------------------

Successfully concatenated 13854 poems into 'all_poems_cleaned.txt'

Sample cleaning (poem at index 101):
Original: '\r\r\nThe sound of a guitar drifts through the air.\r\r\nCupped in my hand, a snowflake quivers lightly.\r\r'...
Cleaned: 'The sound of a guitar drifts through the air.\nCupped in my hand, a snowflake quivers lightly.\nThick '...
```

This file is around 20MB and 400,000 lines long, which is 20 times the size and 10 times the number of lines of the Shakespeare dataset.

## Training Results on Poetry Dataset

```
step 0: train loss 10.8247, val loss 10.8255
step 100: train loss 6.2405, val loss 6.5146
step 200: train loss 5.7141, val loss 6.2657
step 300: train loss 5.5298, val loss 6.1561
step 400: train loss 5.4678, val loss 5.8279
step 500: train loss 5.5526, val loss 5.7174
step 600: train loss 5.2497, val loss 5.6578
step 700: train loss 5.1549, val loss 5.6028
step 800: train loss 5.0009, val loss 5.7194
step 900: train loss 5.2021, val loss 5.5778
step 1000: train loss 4.8988, val loss 5.5454
step 1100: train loss 4.9935, val loss 5.4814
step 1200: train loss 4.9520, val loss 5.3551
step 1300: train loss 5.0129, val loss 5.3685
step 1400: train loss 4.9534, val loss 5.3807
step 1500: train loss 4.7947, val loss 5.3912
step 1600: train loss 5.0557, val loss 5.2993
step 1700: train loss 4.8419, val loss 5.2611
step 1800: train loss 4.7657, val loss 5.0324
step 1900: train loss 4.4551, val loss 5.0815
step 2000: train loss 4.6674, val loss 5.1306
step 2100: train loss 4.6318, val loss 5.0484
step 2200: train loss 4.6357, val loss 5.2188
step 2300: train loss 4.5006, val loss 4.9910
step 2400: train loss 4.3960, val loss 5.0353
step 2500: train loss 4.4227, val loss 5.0051
step 2600: train loss 4.4193, val loss 4.9974
step 2700: train loss 4.4097, val loss 4.9683
step 2800: train loss 4.2323, val loss 4.9965
step 2900: train loss 4.3671, val loss 4.8900
step 3000: train loss 4.3548, val loss 4.8972
step 3100: train loss 4.3923, val loss 4.7957
step 3200: train loss 4.4397, val loss 4.7694
step 3300: train loss 4.3573, val loss 4.9981
step 3400: train loss 4.3772, val loss 4.8391
step 3500: train loss 4.3908, val loss 4.8069
step 3600: train loss 4.2172, val loss 4.7400
step 3700: train loss 4.1613, val loss 4.8643
step 3800: train loss 4.2559, val loss 4.9014
step 3900: train loss 4.0760, val loss 4.7784
step 4000: train loss 3.9681, val loss 4.7814
step 4100: train loss 4.0662, val loss 4.8351
step 4200: train loss 4.1156, val loss 4.9005
step 4300: train loss 4.1036, val loss 4.7409
step 4400: train loss 4.0790, val loss 4.6941
step 4500: train loss 4.1168, val loss 4.8207
step 4600: train loss 3.8932, val loss 4.7466
step 4700: train loss 4.0971, val loss 4.9108
step 4800: train loss 4.0825, val loss 4.8164
step 4900: train loss 4.0249, val loss 4.7728
step 4999: train loss 4.0157, val loss 4.7919
```

The model generates much more diverse and poetic text:

```
! but ...  
beautise on a head, everything's
served, seemed—
Lewash on the back of the garbled pllesh,
are not to be vigilant
by food, tears, eyes burnt,
dust and screaming. Just say —I've brought
Grandter aesthetics—
maybe God like John Fanny or that.7.
Everything's that alonghed in.
Butoried to me
when he yelled.

Just urboilherer appeared. Then he were falling, sits crying and prayed to his brother, being missing. They started on time they went up, though
God said his father had to stop a good reporters
stand, locked, hooves, feet up tighter, "Is smooth?"
The Morning
Season explores the world of the walls
Gazels through the light. Later each day,
A reasonably thing is beauties
At evening a while Frains unself from a walk.Zusted in light old
The way used to the land. On the snow?
There said, "Not offensive." "but that's the trietry, "Nor does
say, but it" with footage,
 Maoaching the crowd."You like the power actual
or on in their apartmentrelices, and the vinyl themselves lie together by that the Jewish sound." So, in one hand,
you could folding it backdroaches and wall you made
had keep what'﻿s done." and I stared, picking a grump offpour, and stared on the smoke, tapped to a wheel and the twos winkboat.
The house was a cigar on my stopes of dilelict and
those threatened hunger from how to be at moving steadily, could never believe
as white but a man with pens would not take  to. I could remember that night.
The moon was thick, the wind rivening the waves of the sea, the swift dark whiteerly recedes
from are it and its silkency of    paths comprising sleep, a rail of o'clock. Outspread it somewhere,
and if it ever repeated; soon, just angularling forward, the magager and schimology.The rifle wasn't wobbling paths and blinked,
```

## Further Training Attempts

To try and further improve, we try training longer and with a learning rate that is ten times smaller. However, both training and validation seem to have saturated. We also try a cosine learning rate with multiple restarts, but the results are not very good:

```python
step_lr = config.learning_rate*np.cos(0.5*np.pi*iter/(config.max_iters-1))
for group in optimizer.param_groups:
  group['lr'] = step_lr
```

```
step 0: train loss 10.8202, val loss 10.8287
...
step 3000: train loss 4.5538, val loss 5.0448
...
step 1000: train loss 4.5272, val loss 4.9344
...
step 999: train loss 4.2557, val loss 4.8072
...
step 999: train loss 4.0713, val loss 4.7289
...
step 999: train loss 4.1581, val loss 4.8483
```

Next, we try reshuffling the training and validation split of the input data by using the first 10% for validation instead. We find that training loss is now higher, another sign we were overfitting. After further training, we end up with training loss and validation loss being about 4. The final result is decent:

```
Summer dazed
with its theatrical designs, tubes, guts.
I clump the bripscrewed black.
I share the precise whatever
not actually needed.
I say when it grazed the time,
things myself between them
and there's little wings forth
English stains, the slick cold force.
Running the basement that moved
never. I wonder whether it meant
that this sad adventure within and
unlemishes the dead.
I was writing that Old Friend was
always working on I have
seen many plans seeing unsatisfied,
she was always ashamed
of this region.
I think of the Second Coming
asleep clear as I thought
waswitch recognized yet because of himself
were not afraid of me
but this sequence after the war
that had been doing to me
don't hurt me I meant so many years ago.
I wasn't my brother.
```

## Finetuning on Shakespeare

Lastly, we try finetuning on the tiny Shakespeare dataset we started with. We have essentially pretrained our larger model on the larger poetry dataset and now use a much lower learning rate (3e-6) and 10,000 training iterations to refine on the smaller tiny Shakespeare dataset.

```
step 10000: train loss 3.1057, val loss 4.1152
```

This is much better than when we just tried to train our larger model with the GPT-2 tokenizer on the Shakespeare data alone. This is the advantage of pretraining! Here are the results:

```
Is he contented himself with his exercise,
Even he that fall'd upon his tent with him
The ground o'er his bed, his dole from the north,
And cries 'He well.'
And Tranio, which consummate honour, in turn
Proclaims him on his way; and he cried,
Lay him that comments mortals play out.

LADY CAPULET:
My lords, I will not hear my traitor.

DUKE VINCENTIO:
Wrut, away! thou shalt never weep;
And yet I have received thy royal presence,
Having done the corse. But thou'll hear be
My father's son, blessing in the cruel gown,
though mine own buried heir
Our father's poor son, my poor daughter, my child,
Where I am resign'd me; and I will be king,
And pain'd the house of this churchyard call.
Thy father, and I seek thee here;
So, newly wench'd with that great aspect,
And thy servile' mortal presence made me,
And thou wouldst board thy mortal bones
In readiness, he may hear it bear.
Ah, art thou law to be made my nurse.

LADY CAPULET:
Ay, I'll win thee would not woe awhile.

DUKE OF YORK:
O gentle Plantagenet queen,

ISABELLA:
Ah, my lord, thou art safe and younger!

DUKE OF YORK:
Farewell with us, bleated those that have said,
That we should plague thee for many days.

KING RICHARD II:
Give me my father to your brother's house,
Or else send him by your fortunes to the street.
What art thou slain?

GLOUCESTER:
Harry of York, I tell thee that kill thy life:
And thou, contracted hither to my farm,
Thou art so happy to be repelling'd at thy mind!
As on a day that pageant thou sufficiency,
Now let thy father speak before thy function.

KING RICHARD II:
O coward to this day; there comes Hereford with thee!
```

Wow! While it's still not perfectly coherent, it seems much better than our output from the character-level tokenizer. Some characters even have multiple lines!

## Key Insights

This part demonstrates several important concepts in modern language model training:

1. **Dataset Scale Matters**: The larger poetry dataset (20x bigger) significantly improved text quality and diversity.

2. **Data Cleaning is Critical**: Proper handling of line terminators and text formatting is essential for good training data.

3. **Pretraining + Finetuning Works**: The two-stage approach of pretraining on a large diverse corpus, then finetuning on a specific domain, produces better results than training on the target domain alone.

4. **Overfitting Remains a Challenge**: Even with more data, the model still shows signs of overfitting, indicating we need even more data or better regularization.

5. **Modern Tokenization Benefits**: Subword tokens produce more natural-looking text even when the model isn't perfectly trained.

The progression from character-level Shakespeare generation to subword-level poetry and then Shakespeare finetuning shows the power of scaling both model size and training data in the right sequence.