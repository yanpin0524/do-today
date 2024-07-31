<template>
  <div class="row p-3">
    <div class="input-group col-12 mb-4">
      <input
        type="text"
        class="form-control border-end-0"
        placeholder="Search"
        v-model="search" />
      <i
        @click="search = ''"
        class="bi bi-x-lg input-group-text border-start-0 bg-white"></i>
    </div>

    <div class="nav nav-tabs col-12 justify-content-evenly">
      <li class="nav-item" @click="setFilter('all')">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 'all',
            'text-success': activeFilter !== 'all',
          }">
          All
        </p>
      </li>
      <li class="nav-item" @click="setFilter(3)">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 3,
            'text-success': activeFilter !== 3,
          }">
          High
        </p>
      </li>
      <li class="nav-item" @click="setFilter(2)">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 2,
            'text-success': activeFilter !== 2,
          }">
          Medium
        </p>
      </li>
      <li class="nav-item" @click="setFilter(1)">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 1,
            'text-success': activeFilter !== 1,
          }">
          Low
        </p>
      </li>
      <li class="nav-item" @click="setFilter(0)">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 0,
            'text-success': activeFilter !== 0,
          }">
          No priority
        </p>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activeFilter"],
  emits: ["setFilter", "inputSearch"],
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search() {
      this.$emit("inputSearch", this.search);
    },
  },
  methods: {
    setFilter(filter) {
      this.$emit("setFilter", filter);
    },
  },
};
</script>

<style scoped>
.bi-x-lg {
  cursor: pointer;
}
</style>
