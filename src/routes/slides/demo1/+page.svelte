<script>
  import { svelteStore } from "./store.js";
  import { JSONEditor } from "svelte-jsoneditor";

  function handleChange(updatedContent) {
    svelteStore.set(updatedContent);
  }
</script>

<div class="flex flex-col items-center justify-center h-auto">
  <h1>JSON Editing</h1>

  <div class="w-96 h-96	">
    <JSONEditor content={$svelteStore} onChange={handleChange} />
  </div>
</div>
