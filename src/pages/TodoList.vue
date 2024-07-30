<template>
  <BaseCard class="mt-4">
    <h4
      class="card-title mb-3 p-2 pb-3 border-bottom border-success text-success">
      Tasks
    </h4>
    <ul class="list-group list-group-flush">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        v-bind="todo"
        @toggleForm="toggleForm('edit')" />
    </ul>
  </BaseCard>
  <TodoForm v-if="displayForm" :action="formAction" />
  <div v-else class="container mt-4 opacity-75">
    <button
      @click="toggleForm('add')"
      id="add-task-btn"
      class="btn btn-outline-success w-100 fs-5 fw-bold border-success border-2">
      <i class="bi bi-plus-circle-fill"></i> Add Task
    </button>
  </div>
</template>

<script>
import TodoItem from "../components/todos/TodoItem.vue";
import TodoForm from "../components/todos/TodoForm.vue";
export default {
  components: { TodoItem, TodoForm },
  data() {
    return {
      displayForm: false,
      formAction: "add",
    };
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
  methods: {
    toggleForm(formAction = "add") {
      this.formAction = formAction;
      this.displayForm = !this.displayForm;
    },
  },
};
</script>

<style scoped>
#add-task-btn {
  border-style: dashed;
}
</style>
