<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img
        :src="fitUrl"
        :alt="user.nickName"
        class="rounded-circle img-thumbnail"
      />
      <div class="detail ml-2">
        <h5 class="d-block mb-0">{{ user.nickName }}</h5>
        <span class="text-truncate text-muted d-block">{{
          user.description
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { UserProps } from "../store";
import { addColumnAvatar } from "../hooks/Hleper";
export default defineComponent({
  name: "user-profile",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(props) {
    const fitUrl = computed(() => {
      addColumnAvatar(props.user, 50, 50);
      const { avatar } = props.user;
      return avatar && avatar.tacitlyUrl;
    });
    console.log(fitUrl);
    return {
      fitUrl,
    };
  },
});
</script>

<style scoped>
.user-profile-component img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
}
</style>