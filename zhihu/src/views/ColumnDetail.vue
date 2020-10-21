<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list"></PostList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import PostList from "../components/PostList.vue";
import { GlobalDataProps } from "../store";
import { useStore } from "vuex";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const routeID = +useRoute().params.id;
    const column = computed(() => {
      return store.getters.getColumnId(routeID);
    });
    const list = computed(() => {
      return store.getters.getColumnList(routeID);
    });
    return {
      column,
      list,
    };
  },
});
</script>

<style scoped>
</style>