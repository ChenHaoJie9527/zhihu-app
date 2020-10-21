<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="item in ColumList" :key="item._id">
      <div class="card h-100 shadow-sm p-3 mb-5">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light my-3"
            :src="item.avatar && item.avatar.url"
            :alt="item.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text text-left">
              {{ item.description }}
            </p>
            <div
              href="#"
              class="btn btn-outline-primary"
              @click="onClickToColumn(item._id)"
            >
              进入专栏
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare let require: any;
import { computed, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { ColumnProps } from "../store";
export default defineComponent({
  name: "ColumnList",
  props: {
    //这里特别有一点，我们现在的 Array 是没有类型的，只是一个数组，我们希望它是一个 ColomnProps 的数组，那么我们是否可以使用了类型断言直接写成 ColomnProps[]，
    //显然是不行的 ，因为 Array 是一个数组的构造函数不是类型，我们可以使用 PropType 这个方法，它接受一个泛型，讲 Array 构造函数返回传入的泛型类型。
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    const ColumList = computed(() => {
      return props.list.map((item) => {
        if (!item.avatar) {
          item.avatar = require("../assets/avatar.jpg");
        } else {
          item.avatar.url = item.avatar.url + "?x-oss-process=image/resize,m_pad,h_50,w_50";
        }
        return item;
      });
    });
    const router = useRouter();
    const onClickToColumn = (id: string) => {
      router.push({
        name: "column",
        params: {
          id,
        },
      });
    };
    return {
      ColumList,
      onClickToColumn,
    };
  },
});
</script>

<style scope>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
