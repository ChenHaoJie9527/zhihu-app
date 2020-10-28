<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentPost.image.url"
        :alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
      />
      <h2 class="mb-3">
        {{ currentPost.title }}
      </h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <UserProfile
            v-if="typeof currentPost.author === 'object'"
            :user="currentPost.author"
          ></UserProfile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps, PostProps, AvatarType } from "../store";
import MarkdownIt from "markdown-it";
import UserProfile from "../components/UserProfile.vue";
export default defineComponent({
  name: "postDetail",
  components: {
    UserProfile,
  },
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = route.params.id;
    const md = new MarkdownIt();
    onMounted(() => {
      store.dispatch("fetchPost", currentId);
    });
    const currentPost = computed<PostProps>(() => {
      return store.getters.getCurrentPost(currentId);
    });
    const currentHTML = computed(() => {
      if (currentPost.value.content) {
        const { isHTML, content } = currentPost.value;
        return isHTML? content : md.render(content);
      }
    });
    const currentImageURL = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value;
        return (image as AvatarType).url + `?x-oss-process=image/resize,w_850`;
      } else {
        return null;
      }
    });
    return {
      currentPost,
      currentHTML,
      currentImageURL,
    };
  },
});
</script>

<style scoped>
</style>