---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: slide-left
# use UnoCSS
css: unocss
title: LoRA
download: true
---

# [LoRA: Low-Rank Adaptation of Large Language Models](https://openreview.net/forum?id=nZeVKeeFYf9)

<div class="text-lg">

[Edward J Hu](https://openreview.net/profile?id=~Edward_J_Hu1),
[yelong shen](https://openreview.net/profile?id=~yelong_shen1),
[Phillip Wallis](https://openreview.net/profile?id=~Phillip_Wallis1),
[Zeyuan Allen-Zhu](https://openreview.net/profile?id=~Zeyuan_Allen-Zhu1),  
[Yuanzhi Li](https://openreview.net/profile?id=~Yuanzhi_Li1),
[Shean Wang](https://openreview.net/profile?id=~Shean_Wang1),
[Lu Wang](https://openreview.net/profile?email=luw%40microsoft.com),
[Weizhu Chen](https://openreview.net/profile?id=~Weizhu_Chen1)  
</div>

#### Microsoft
### ICLR 2022


<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/toonnyy8-notes/LoRA/" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# Introduction

<p class="text-xl">
Pre-trained and Fine-tuning
</p>

<p class="text-2xl">

Many applications in natural language processing rely on applying a large-scale, pre-trained language model to multiple downstream applications through fine-tuning.

However, the fine-tuned model according to different tasks has the same size parameters as the pre-trained model,
This requires a lot of space to store the models of these specialized tasks.

</p>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Introduction (cont.)

## Existing Solution

<p class="text-2xl">
Many sought to mitigate this by adapting only some parameters or learning external modules for new tasks.  
</p>

e.g., Bias-only Tuning, Prefix-tuninig, Adapter Layer.

<!--In this way, in addition to the pre-trained model for each task, only a small number of task-specific parameters need to be stored and loaded, which greatly improves the operating efficiency during deployment.-->

<div class="grid grid-cols-2">


<img class="w-7/8" src="/assets/prefix-tuning.png" />

<img class="w-7/8" src=https://user-images.githubusercontent.com/26186289/236157447-84b3bd98-203c-44bb-aee8-9671995dbcb2.png />

</div>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Introduction (cont.)
## Aren’t Existing Solutions Good Enough ?

<div class="grid grid-cols-7">

<p class="col-span-3">

Nevertheless, techniques prior to LoRA often introduce
- inference latency by extending model depth,
- reduce the model's usable sequence length.

more importantly, these methods often fail to match the fine-tuning baselines, posing a trade-off between efficiency and model quality.

</p>

<p class="col-span-4">

<img  src=https://user-images.githubusercontent.com/26186289/236154480-092797a2-c96f-4ce8-9667-4aa90f8f8c47.png />

<p class="pl-8">
When the generation length is shorter and the batch is smaller, the additional computational cost of the Adapter Layer is more obvious.
</p>

</p>

</div>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# **Lo**w **R**ank **A**daptation

<div class="grid grid-cols-5">

<p class="text-2xl col-span-3">

Write the weight matrix of fine-tuning in the form of $W+\Delta W$, and $W, \Delta W \in \mathbb{R}^{d\times k}$;  
$W$ is the pre-trained weight matrix.

LoRA constrain finr-tuned update $\Delta W$ by representing the latter with a low-rank decomposition $\Delta W=\frac{\alpha}{r}BA^{\top}$, $A \in \mathbb{R}^{k\times r}$, $B\in\mathbb{R}^{d\times r}$ and $r\ll min(d,k)$, $\alpha$ is a constant scalar.  

</P>

<img class="col-span-2" src=https://user-images.githubusercontent.com/26186289/236153734-06cb3e73-7800-44e8-8d1e-353a0c822c5b.png />

</div>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# **Lo**w **R**ank **A**daptation (cont.)

<p class="text-2xl">

$\Delta W$ of LoRA = $BA^{\top}$

</p>


<p class="text-2xl">

- LoRA's trainable parameters are much smaller than full fine-tuning due to $r\ll d$.
- A Generalization of Full Fine-tuning.  
  <span class="text-xl">Roughly recover the expressiveness of full fine-tuning by setting the LoRA rank r to the rank of the pre-trained weight matrices.</span>
- No Additional Inference Latency.  
  <span class="text-xl">Adding the pre-training weights $W$ to the LoRA parameters $BA^{\top}$ first will not increase the amount of calculation during inference.</span>

</P>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Experiment

## Comparing the performance on GPT-3

<br/>
<img class="w-3/4 m-auto" src=https://user-images.githubusercontent.com/26186289/236169641-446eb8c5-b13a-42b9-93d7-51858befe37d.png />
<br/>
<br/>
<br/>
<p class="text-xl">
In the experiments of this paper, only the attention layer adds LoRA parameters.
</p>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

## the Optimal Rank $r$ for LoRA

### GPT-3
<img class="w-4/5 m-auto" src=https://user-images.githubusercontent.com/26186289/236295528-7f29a925-481b-47ad-9bad-13ebda4cd1a4.png />

### GPT-2
<img class="w-4/5 m-auto" src=https://user-images.githubusercontent.com/26186289/236295691-d9527bb9-575d-4f07-b626-739ca80d3b1c.png />

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Experiment (cont.)

<img src=https://user-images.githubusercontent.com/26186289/236190473-4d3ce912-a4a7-4ea9-9f7d-5659cdd5f0d0.png />

<p class="text-xl">

- Prefix-tuning is difficult to optimize and that its performance changes non-monotonically in trainable parameters.
- LoRA has stable performance under various number of parameters.

</p>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Experiment (cont.)

## Low-Data Regime

<img class="m-auto w-4/5" src=https://user-images.githubusercontent.com/26186289/236291183-63dfcaf3-f3d1-4418-abcb-fe882d826bdd.png />

<p class="text-xl">
Compared with the Prefix-tuning method with obvious performance degradation, LoRA still shows good performance with only a small amount of data.
</p>

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Experiment (cont.)

## Combined with Other Adaptation Methods

<img class="m-auto w-3/4" src=https://user-images.githubusercontent.com/26186289/236303960-bd9f3386-d1a2-44ac-be02-0c172c2f302d.png />

<SlideCurrentNo class="absolute bottom-4 right-6" />

---

# Conclusions

<p class="text-xl">
This study proposes LoRA to replace fine-tuning  
</p>

<p class="text-xl">

- With the same pre-trained weights, only a small number of LoRA parameters need to be saved for different tasks. 
- That neither introduces inference latency nor reduces input sequence length while retaining high model quality.
- Can be combined with other efficient adaptation methods, potentially providing orthogonal improvement.

</p>

## Next Version

<p class="text-xl">
AdaLoRA, which adaptively allocates the parameter budget among weight matrices according to their importance score.
</p>

<SlideCurrentNo class="absolute bottom-4 right-6" />
