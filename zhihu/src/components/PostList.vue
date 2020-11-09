<template>
  <div class="post-list">
    <article v-for="item in post" :key="item._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${item._id}`">{{ item.title }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="item.image && typeof item.image !=='string'" class="col-3">
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
        <span class="text-muted">{{ item.updatedAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { generateFitUrl } from "../hooks/Hleper";
import { PostProps, AvatarType } from "../store";
export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
  setup(props) {
    const post = computed(() => {
      return props.list.map((item) => {
        generateFitUrl(item.image as AvatarType, 200, 100, ["m_fill"]);
        return item;
      });
    });
    return {
      post
    };
  },
});
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
.card-body img {
  width: 100px;
  height: 100px;
}
</style>