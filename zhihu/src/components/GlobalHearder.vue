<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">知乎专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-1">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-dark my-2">登录</a>
      </li>
      <li class="list-inline-item mb-1">
        <a href="#" class="btn btn-outline-dark my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-1">
      <li class="list-inline-item">
        <DropDown :title="`您好${user.name ? user.name : 'vikkit'}`">
          <DropddownItem>
            <a href="#" class="dropdown-item">新建文章</a>
          </DropddownItem>
          <DropddownItem disabled>
            <a href="#" class="dropdown-item">我的专栏</a>
          </DropddownItem>
          <DropddownItem disabled>
            <a href="#" class="dropdown-item">编辑资料</a>
          </DropddownItem>
          <DropddownItem>
            <a href="#" class="dropdown-item">退出登录</a>
          </DropddownItem>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import DropDown from "./Dropdown.vue";
import DropddownItem from "./DropddownItem.vue";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: "GlobalHearder",
  components: {
    DropDown,
    DropddownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scope>
</style>