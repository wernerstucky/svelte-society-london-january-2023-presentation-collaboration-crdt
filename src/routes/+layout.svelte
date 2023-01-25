<script>
  import "../app.css";
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";

  let slides = {
    start: {
      title: "Start",
      url: "/slides/start",
    },
    why: {
      title: "Why",
      url: "/slides/why",
    },
    why2: {
      title: "Why2",
      url: "/slides/why2",
    },
    demo1: {
      title: "Demo 1",
      url: "/slides/demo1",
    },
    defining: {
      title: "Defining",
      url: "/slides/defining",
    },
    blog_api: {
      title: "Blog API",
      url: "/slides/blog_api",
    },
    blog_crdt: {
      title: "Blog CRDT",
      url: "/slides/blog_crdt",
    },
    stubber_demo: {
      title: "Stubber Demo",
      url: "/slides/stubber_demo",
    },
    where_to_start: {
      title: "Where to Start",
      url: "/slides/where_to_start",
    },

    references: {
      title: "References",
      url: "/slides/references",
    },
  };

  let slidesArr = [];
  let slideKeys = Object.keys(slides);
  slidesArr = slideKeys.map((key) => slides[key]);

  const slidesStore = writable(slidesArr);
  let currentIndex = 0;

  const previous = (index) => Math.max(index - 1, 0);
  const next = (index, numElem) => Math.min(index + 1, numElem - 1);
  function handleKeydown(event) {
    const numSlides = slidesArr.length;
    switch (event.key) {
      case "ArrowLeft":
        currentIndex = previous(currentIndex);
        goto(slidesArr[currentIndex].url);
        break;
      case "ArrowRight":
        currentIndex = next(currentIndex, numSlides);
        goto(slidesArr[currentIndex].url);
        break;
    }
  }

  function gotoPage(index) {
    currentIndex = index;
    goto(slidesArr[index].url);
  }
</script>

<svelte:head>
  <title>Svelte Society London - January 2023 Presentation - Collaboration</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="container max-w-full w-full bg-slate-300">
  <div class="navigation mb-3 absolute">
    {#each slidesArr as slide, index}
      <button
        class="text-xs rounded m-2 p-2 border border-slate-100 {index == currentIndex
          ? 'text-slate-800'
          : 'text-slate-400'}"
        on:click={() => {
          gotoPage(index);
        }}>{slide.title}</button
      >
    {/each}
  </div>
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-full justify-center items-center">
      <slot />
    </div>
  </div>
</div>

<style>
  .container {
    min-height: 100vh;
    height: 100vh;
  }
</style>
