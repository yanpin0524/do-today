<template>
  <div class="row p-3">
    <input
      type="text"
      class="form-control col-12 mb-4"
      placeholder="Search"
      v-model="search" />
    <div class="nav nav-tabs col-12 justify-content-evenly">
      <li class="nav-item">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 'all',
            'text-success': activeFilter !== 'all',
          }">
          All
        </p>
      </li>
      <li class="nav-item">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 'high',
            'text-success': activeFilter !== 'high',
          }">
          High
        </p>
      </li>
      <li class="nav-item">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 'medium',
            'text-success': activeFilter !== 'medium',
          }">
          Medium
        </p>
      </li>
      <li class="nav-item">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 'low',
            'text-success': activeFilter !== 'low',
          }">
          Low
        </p>
      </li>
      <li class="nav-item">
        <p
          class="nav-link"
          :class="{
            active: activeFilter === 'none',
            'text-success': activeFilter !== 'none',
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
  methods: {
    setFilter(filter) {
      this.$emit("setFilter", filter);
    },
    inputSearch(search) {
      this.$emit("inputSearch", search);
    },
  },
};
</script>
