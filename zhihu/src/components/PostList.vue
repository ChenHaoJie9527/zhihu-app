<template>
  <div class="post-list">
    <article v-for="item in list" :key="item.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          {{item.title}}
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="item.image" class="col-4">
            <img
              :src="item.image"
              :alt="item.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-8': item.image }" class="text-muted">
            {{ item.content }}
          </p>
        </div>
        <span class="text-muted">{{ item.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { PostProps } from "../testData";
export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
  
});
</script>

<style scoped>
</style>