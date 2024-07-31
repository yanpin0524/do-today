<template>
  <BaseCard class="mt-4">
    <h4
      class="card-title mb-3 p-2 pb-3 border-bottom border-success text-success">
      Tasks
    </h4>
    <TodoFilter :activeFilter="activeFilter" :search="search" />
    <ul class="list-group list-group-flush">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        v-bind="todo"
        @openForm="openForm" />
    </ul>
  </BaseCard>
  <TodoForm
    v-if="displayForm"
    :action="formAction"
    @closeForm="closeForm"
    v-bind="formPayload" />
  <div v-else class="container mt-4 opacity-75">
    <button
      @click="openForm"
      id="add-task-btn"
      class="btn btn-outline-success w-100 fs-5 fw-bold border-success border-2">
      <i class="bi bi-plus-circle-fill"></i> Add Task
    </button>
  </div>
</template>

<script>
import TodoFilter from "../components/todos/TodoFilter.vue";
import TodoItem from "../components/todos/TodoItem.vue";
import TodoForm from "../components/todos/TodoForm.vue";

export default {
  components: { TodoFilter, TodoItem, TodoForm },
  data() {
    return {
      displayForm: false,
      formAction: "add",
      formPayload: {},
      activeFilter: "all",
      search: "",
    };
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
  methods: {
    openForm(formAction = "add", payload = {}) {
      this.formAction = formAction;
      this.formPayload = payload;
      this.displayForm = true;
    },
    closeForm() {
      this.formAction = "add";
      this.formPayload = {};
      this.displayForm = false;
    },
  },
};
</script>

<style scoped>
#add-task-btn {
  border-style: dashed;
}
</style>
