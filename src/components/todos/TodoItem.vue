<template>
  <li class="list-group-item">
    <div class="row align-items-center">
      <span @click="toggleCompleted" class="col-1 fs-3">
        <i v-if="completed" class="bi bi-check-circle-fill"></i>
        <i v-else class="bi bi-circle"></i>
      </span>

      <p
        class="m-0 col"
        :class="{
          'text-decoration-line-through': completed,
          'opacity-50': completed,
        }">
        {{ title }}
      </p>
      <span class="badge rounded-pill col-1 me-3" :class="priorityStyle">
        {{ priorityToText }}
      </span>
      <span
        @click="$emit('openForm', 'edit', { id, title, priority })"
        class="col-1 fs-3">
        <i class="bi bi-three-dots-vertical"></i>
      </span>
    </div>
  </li>
</template>

<script>
import TodoForm from "../todos/TodoForm.vue";

export default {
  props: ["id", "title", "priority", "completed"],
  emits: ["openForm"],
  components: { TodoForm },
  data() {
    return {
      priorityTrans: {
        3: {
          text: "high",
          color: "danger",
        },
        2: {
          text: "med",
          color: "warning",
        },
        1: {
          text: "low",
          color: "success",
        },
      },
    };
  },
  computed: {
    priorityStyle() {
      if (!this.priority) {
        return null;
      }

      return "text-bg-" + this.priorityTrans[this.priority].color;
    },
    priorityToText() {
      if (!this.priority) {
        return "";
      }

      return this.priorityTrans[this.priority].text;
    },
  },
  methods: {
    toggleCompleted() {
      this.$store.dispatch("updateTodoCompleted", {
        id: this.id,
        completed: !this.completed,
      });
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}

i:hover {
  opacity: 0.6;
}

.badge {
  --bs-bg-opacity: 1;
  cursor: default;
}
</style>
