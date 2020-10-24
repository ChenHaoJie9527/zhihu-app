<template>
  <div class="post-list">
    <article v-for="item in list" :key="item._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          {{ item.title }}
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="item.image" class="col-3">
            <img
              :src="item.image && item.image.url"
              :alt="item.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-8': item.image }" class="text-muted">
            {{ item.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ item.createAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PostProps } from "../store";
export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.card-body img {
  width: 100px;
  height: 100px;
}
</style>