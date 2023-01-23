<script>
  import { svelteStore } from "./store.js";
  import { JSONEditor } from "svelte-jsoneditor";

  function handleChange(updatedContent) {
    svelteStore.set(updatedContent);
  }
</script>

<div class="flex flex-col items-center justify-center h-auto">
  <h1 class="text-slate-700 text-6xl font-bold">JSON Editing</h1>
  <br />
  <div class="w-96 h-96	">
    <JSONEditor content={$svelteStore} onChange={handleChange} />
  </div>
</div>
