<template>
  <div class="home-page text-center container">
    <section class="row py-1g-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <img src="../assets/callout.svg" alt="callout" class="w-50" />
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <a
            href="#"
            class="btn btn-primary my-2"
            >开始写文章</a
          >
        </p>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <Uploader
      action="/upload"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileLoaded"
      @file-uploader-error="onFileLoadedError"
    >
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500" />
      </template>
    </Uploader>
    <ColumnList :list="list"></ColumnList>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25">
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { GlobalDataProps, RespontenProps, AvatarType } from "../store";
import Uploader from "../components/Uploader.vue";
import CreateMessage from "../hooks/createMessage";
export default defineComponent({
  name: "home",
  components: {
    ColumnList,
    Uploader,
  },

  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    const list = computed(() => {
      return store.state.columns;
    });
    const beforeUpload = (file: File) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        CreateMessage("上传图片只能是PNG格式", "error");
      }
      return isPNG;
    };
    const onFileLoaded = (rawData: RespontenProps<AvatarType>) => {
      CreateMessage(`上传图片成功 ${rawData.data._id}`, "success");
    };
    const onFileLoadedError = (e: Error) => {
      CreateMessage(`出错！请重新上传 ${e.message}`, "error");
    };
    return {
      list,
      beforeUpload,
      onFileLoaded,
      onFileLoadedError,
    };
  },
});
</script>

<style scoped>
</style>