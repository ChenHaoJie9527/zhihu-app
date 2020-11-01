<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">知乎专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-1">
      <li class="list-inline-item">
        <a
          href="#"
          class="btn btn-outline-dark my-2"
          @click.prevent="onClickToLogin"
          >登录</a
        >
      </li>
      <li class="list-inline-item mb-1">
        <a
          href="#"
          class="btn btn-outline-dark my-2"
          @click.prevent="onClickToSingUp"
          >注册</a
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-1">
      <li class="list-inline-item">
        <DropDown :title="`您好${user.nickName ? user.nickName : 'vikkit'}`">
          <DropddownItem>
            <router-link class="dropdown-item" :to="`/create`">新建文章</router-link>
          </DropddownItem>
          <DropddownItem disabled>
            <router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link>
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
import { defineComponent, PropType } from "vue";
import DropDown from "./Dropdown.vue";
import DropddownItem from "./DropddownItem.vue";
import { useRouter } from "vue-router";
import { UserProps } from "../store";
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
  setup(props) {
    console.log(props.user.column)
    const router = useRouter();

    const onClickToLogin = () => {
      router.push({
        name: "login",
      });
    };
    const onCreateNewPost = () => {
      router.push({
        name: "create",
      });
    };
    const onClickToSingUp = () => {
      router.push({
        name: "singup",
      });
    };
    return {
      onClickToLogin,
      onCreateNewPost,
      onClickToSingUp,
    };
  },
});
</script>

<style scope>
</style>
