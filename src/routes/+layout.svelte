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
    demo1: {
      title: "Demo 1",
      url: "/slides/demo1",
    },
  };

  let slidesArr = [];
  let slideKeys = Object.keys(slides);
  slidesArr = slideKeys.map((key) => slides[key]);

  const slidesStore = writable(slidesArr);
  const currentIndexStore = writable(0);

  const previous = (index) => Math.max(index - 1, 0);
  const next = (index, numElem) => Math.min(index + 1, numElem - 1);
  function handleKeydown(event) {
    const numSlides = slidesArr.length;
    switch (event.key) {
      case "ArrowLeft":
        $currentIndexStore = previous($currentIndexStore);
        goto(slidesArr[$currentIndexStore].url);
        break;
      case "ArrowRight":
        $currentIndexStore = next($currentIndexStore, numSlides);
        goto(slidesArr[$currentIndexStore].url);
        break;
    }
  }
</script>

<svelte:head>
  <title>Svelte Society London - January 2023 Presentation - Collaboration</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="container max-w-full w-full bg-slate-300">
  <div class="navigation mb-3">
    {#each slidesArr as slide, index}
      <a
        class="text-xs rounded m-2 p-2 border border-slate-100 {index == $currentIndexStore
          ? 'text-slate-800'
          : 'text-slate-400'}"
        href={slide.url}>{slide.title}</a
      >
    {/each}
  </div>
  <slot />
</div>

<style>
  .container {
    min-height: 100vh;
    height: 100vh;
  }
</style>
