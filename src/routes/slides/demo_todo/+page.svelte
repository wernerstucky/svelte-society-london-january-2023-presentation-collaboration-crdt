<script>
  import { svelteStore } from "./store.js";

  let newTodo = "";

  const addTodo = () => {
    const value = newTodo && newTodo.trim();

    if (!value) {
      return;
    }
    $svelteStore.todos.push({
      title: value,
      completed: false,
    });
    newTodo = "";
  };

  const removeTodo = (todo) => {
    $svelteStore.todos.splice($svelteStore.todos.indexOf(todo), 1);
  };
</script>

<div class="flex flex-col items-center justify-center h-auto">
  <h1 class="text-slate-700 text-6xl font-bold">Todo List</h1>
  <a class="text-slate-400 text-sm" href="https://syncedstore.org/docs/svelte/" target="_blank"
    >lol</a
  >
  <br />
  <!-- {JSON.stringify($svelteStore.todos)} -->
  <div class="w-96 h-96	">
    <form on:submit|preventDefault={addTodo}>
      <input
        class=" text-xl rounded p-2"
        autocomplete="off"
        placeholder="What needs to be done?"
        bind:value={newTodo}
      />
    </form>
    <ul class="todo-list">
      {#each $svelteStore.todos as todo}
        <li class="todo">
          <div>
            <label>
              <input type="checkbox" bind:checked={todo.completed} class="p-4 m-2 rounded" />
              {todo.title}
            </label>
            <button
              class="bg-red-200 rounded border border-slate-500 px-2 py-1 m-2"
              on:click={() => removeTodo(todo)}>Delete</button
            >
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
