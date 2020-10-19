<template>
  <div class="column=detail-page w-75 mx-auto">
    <div
      class="column-info row bm-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border w-100"
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
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { testData, testPosts } from "../testData";
import PostList from "../components/ColumnList.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const currenID = +route.params.id;
    // const column = testData.find(
    //   (item) => item.id == ((currenID as unknown) as number)
    // ); //方法一 将字符串类型转化为number类型
    // // const column = testData.find((item) => item.id === currenID); // 方法二 通过JS类型转化
    // const list = testPosts.filter((item) => item.columnId === currenID);
    const column = store.getters.getColumns(currenID);
    const list = store.getters.getList(currenID);
    return {
      column,
      list,
    };
  },
});
</script>

<style scoped>
</style>