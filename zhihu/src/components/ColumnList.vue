<template>
  <div class="row">
    <div class="col-4 mt-2" v-for="item in ColumList" :key="item.id">
      <div class="card h-100 shadow-sm p-3 mb-5 bg-white rounded">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light w-20 my-3"
            :src="item.avatar"
            :alt="item.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text text-left">
              {{ item.description }}
            </p>
            <router-link href="#" class="btn btn-outline-primary" :to="`/column/${item.id}?id=123`">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare let require: any;
import { computed, defineComponent, PropType } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

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
        }
        return item;
      });
    });
    return {
      ColumList,
    };
  },
});
</script>

<style scope>
</style>
