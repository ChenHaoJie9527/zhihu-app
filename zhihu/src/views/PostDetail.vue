<template>
  <div class="post-detail-page">
    <Molad
      title="删除文章"
      :visible="modalVisible"
      @modal-on-close="modalVisible = false"
      @modal-on-confirm="modalVisible = false"
    >
      <p>确定要删除文章吗?</p>
    </Molad>
    <article
      class="w-75 mx-auto mb-5 pb-3"
      v-if="currentPost && typeof currentPost.image !== 'string'"
    >
      <img
        :src="currentPost.image && currentPost.image.url"
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
            v-if="typeof currentPost.author !== 'string'"
            :user="currentPost.author"
          ></UserProfile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ updataAtTime }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <div class="btn-group mt-5" v-if="showEdition">
        <router-link
          type="button"
          class="btn btn-success mr-2"
          :to="{ name: 'create', query: { id: currentPost._id } }"
          >编辑文章</router-link
        >
        <button type="button" class="btn btn-dark" @click.prevent="onShowModal">
          删除文章
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps, PostProps, AvatarType, UserProps } from "../store";
import MarkdownIt from "markdown-it";
import UserProfile from "../components/UserProfile.vue";
import Molad from "../components/Molad.vue";
import moment from "moment";
export default defineComponent({
  name: "postDetail",
  components: {
    UserProfile,
    Molad,
  },
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = route.params.id;
    const md = new MarkdownIt();
    const modalVisible = ref(false);
    onMounted(() => {
      store.dispatch("fetchPost", currentId);
    });
    const currentPost = computed<PostProps>(() => {
      return store.getters.getCurrentPost(currentId);
    });
    const updataAtTime = moment(currentPost.value.updatedAt).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const currentHTML = computed(() => {
      if (currentPost.value.content) {
        const { isHTML, content } = currentPost.value;
        //如果是false 说明不需要转译 表示是HTML标签
        return isHTML ? md.render(content) : content;
      }
    });
    const showEdition = computed(() => {
      const { _id, isLogin } = store.state.user;
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps;
        return postAuthor._id == _id;
      } else {
        return false;
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
    const onShowModal = () => {
      modalVisible.value = true;
    };
    return {
      currentPost,
      currentHTML,
      currentImageURL,
      showEdition,
      updataAtTime,
      modalVisible,
      onShowModal,
    };
  },
});
</script>

<style scoped>
</style>