<template>
  <BaseCard
    class="mt-4 rounded-4"
    :class="{
      'text-bg-success': !isEdit,
      'text-bg-dark': isEdit,
      'mb-5': isEdit,
    }">
    <form @submit.prevent="submitForm" class="p-3 pb-0">
      <div class="row">
        <div class="col-md-9 col-sm-12 mb-3">
          <input
            class="form-control"
            id="title"
            type="text"
            placeholder="Task name here..."
            @blur="formValid = true"
            v-model.trim="newTitle" />
          <label v-if="!formValid" class="text-danger form-text" for="title">
            task name cannot be empty
          </label>
        </div>
        <div class="col-md-3 col-sm-12 mb-5">
          <select
            name="priority"
            id="priority"
            class="form-select col"
            v-model.number="newPriority">
            <option value="0" selected>No priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <div v-if="isEdit" class="col-md-2 col-sm-12 mb-3">
          <button
            @click="deleteTodo"
            class="btn btn-link text-decoration-none text-white fw-bold">
            Delete
          </button>
        </div>
        <div class="col-sm-6 ms-auto mb-3" :class="{ 'col-md-2': isEdit }">
          <button
            @click="cancelForm"
            class="btn btn-outline-light w-100"
            :class="{ 'btn-sm': isEdit }">
            Cancel
          </button>
        </div>
        <div class="col-sm-6" :class="{ 'col-md-2': isEdit }">
          <button class="btn btn-light w-100" :class="{ 'btn-sm': isEdit }">
            Save
          </button>
        </div>
      </div>
    </form>
  </BaseCard>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: "add",
      validate: (value) => ["add", "edit"].includes(value),
    },
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    priority: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  emits: ["closeForm"],
  data() {
    return {
      newTitle: this.title,
      newPriority: this.priority,
      formValid: true,
    };
  },
  watch: {
    id(value) {
      if (!value) return;

      this.newTitle = this.title;
      this.newPriority = this.priority;
    },
  },
  computed: {
    isEdit() {
      return this.action === "edit";
    },
  },
  methods: {
    async submitForm() {
      if (!this.newTitle) {
        this.formValid = false;
        return;
      }

      try {
        if (this.isEdit && this.id) {
          this.$store.dispatch("updateTodo", {
            id: this.id,
            title: this.newTitle,
            priority: this.newPriority,
          });
        } else {
          await this.$store.dispatch("addTodo", {
            title: this.newTitle,
            priority: this.newPriority,
          });
        }
      } catch (err) {
        if (err.cause === 401) {
          this.$store.dispatch("logout");
          this.$router.replace("/auth/login");
          return;
        }
        alert(err);
      }

      this.$emit("closeForm");
    },
    cancelForm() {
      this.$emit("closeForm");
    },
    async deleteTodo() {
      if (!this.id) return;

      try {
        await this.$store.dispatch("deleteTodo", this.id);
      } catch (err) {
        if (err.cause === 401) {
          this.$store.dispatch("logout");
          this.$router.replace("/auth/login");
          return;
        }
        alert(err);
      }

      this.$emit("closeForm");
    },
  },
};
</script>
