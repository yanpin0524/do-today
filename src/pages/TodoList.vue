<template>
  <BaseCard class="mt-4 rounded-5 p-2 pb-5">
    <h4
      class="card-title mb-3 p-2 pb-3 border-bottom border-success text-success">
      Tasks
      <button @click="hideCompleted" class="btn btn-sm float-end border-0">
        {{ $store.getters.getHideCompletedState }} completed
      </button>
    </h4>
    <TodoFilter
      :activeFilter="activeFilter"
      :search="search"
      @setFilter="setFilter"
      @inputSearch="setSearch" />
    <ul class="list-group list-group-flush mt-2">
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
      filteredTodos: null,
    };
  },
  computed: {
    todos() {
      return this.filteredTodos || this.$store.getters.getTodos;
    },
  },
  watch: {
    activeFilter() {
      if (this.activeFilter === "all") {
        this.filteredTodos = null;
      } else {
        this.filteredTodos = this.$store.getters.getTodos.filter(
          (todo) => todo.priority === this.activeFilter
        );
      }
    },
    search(value) {
      this.activeFilter = "all";
      if (!value) {
        this.filteredTodos = null;
      } else {
        this.filteredTodos = this.$store.getters.getTodos.filter((todo) =>
          todo.title.toLowerCase().includes(value.toLowerCase())
        );
      }
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
    setFilter(filter) {
      this.activeFilter = filter;
    },
    setSearch(search) {
      this.search = search;
    },
    hideCompleted() {
      this.$store.commit("toggleOnlyUncompleted");
    },
  },
  async created() {
    try {
      await this.$store.dispatch("fetchTodos");
    } catch (err) {
      if (err.cause === 401) {
        this.$store.dispatch("logout");
        this.$router.replace("/auth/login");
        return;
      }
      alert(err);
    }
  },
};
</script>

<style scoped>
#add-task-btn {
  border-style: dashed;
}
</style>
