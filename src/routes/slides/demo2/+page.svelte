<script>
  import { svelteStore } from "./store.js";
  import { JSONEditor } from "svelte-jsoneditor";
  import { propertyStore } from "svelte-writable-derived";

  const titleStore = propertyStore(svelteStore, ["json", "article", "title"]);
  const contentStore = propertyStore(svelteStore, ["json", "article", "content"]);

  function handleChange(updatedContent) {
    svelteStore.set(updatedContent);
  }
</script>

<div class="flex flex-col items-center justify-center h-auto">
  <h1 class="text-slate-700 text-6xl font-bold">Blog Example</h1>
  <br />
  <div class="w-96 h-96	">
    <JSONEditor content={$svelteStore} onChange={handleChange} />
  </div>
  <span class="text-xl text-blue-600 p-4"
    >Title : <input type="text" bind:value={$titleStore} class="rounded p-2" /></span
  ><br />
  <textarea bind:value={$contentStore} class="rounded p-2 text-slate-600" rows="10" cols="50" />
</div>
