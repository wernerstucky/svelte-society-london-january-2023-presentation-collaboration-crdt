<script>
  import { svelteStore } from "./store.js";
  import { JSONEditor } from "svelte-jsoneditor";

  function handleChange(updatedContent) {
    svelteStore.set(updatedContent);
  }
</script>

<h1>JSON Editing</h1>

<div class="w-96	">
  <JSONEditor content={$svelteStore} onChange={handleChange} />
</div>
