<template>
  <BaseCard
    class="mt-4"
    :class="{
      'text-bg-success': !isEdit,
      'text-bg-dark': isEdit,
      'mb-5': isEdit,
    }">
    <form class="p-3 pb-0">
      <div class="row">
        <div class="col-md-9 col-sm-12 mb-3">
          <input
            class="form-control"
            type="text"
            placeholder="Task name here..." />
        </div>
        <div class="col-md-3 col-sm-12 mb-5">
          <select name="priority" id="priority" class="form-select col">
            <option value="0" selected>No priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <div v-if="isEdit" class="col-md-2 col-sm-12 mb-3">
          <button class="btn btn-link text-decoration-none text-white fw-bold">
            Delete
          </button>
        </div>
        <div class="col-sm-6 ms-auto mb-3" :class="{ 'col-md-2': isEdit }">
          <button
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
    },
    priority: {
      type: Number,
      required: false,
    },
  },
  computed: {
    isEdit() {
      return this.action === "edit";
    },
  },
};
</script>
