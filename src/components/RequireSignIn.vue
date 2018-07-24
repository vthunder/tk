<template>
    <div v-if="me">
        <slot></slot>
    </div>
    <div v-else class="need-auth">
        <span v-if="enable_login">
            {{ prop.pre_text }}
            <b-button class="mx-1" :variant=prop.variant @click=showModal>
                Sign in <i class="fas fa-sign-in-alt"></i>
            </b-button>
            {{ prop.post_text }}
        </span>
    </div>
</template>

<script>
import * as auth from '../graphql/auth';

export default {
  props: ['pre_text', 'post_text', 'variant', 'next_route'],
  data() {
    return {
      me: '',
      enable_login: process.env.VUE_APP_ENABLE_LOGIN === 'true',
      prop: {
        pre_text: (this.pre_text || ''),
        post_text: (this.post_text || 'to access this page.'),
        variant: (this.variant || 'primary'),
        next_route: (this.next_route || ''),
      },
    };
  },
  apollo: {
    me: auth.query.me,
  },
  methods: {
    showModal() {
      if (this.prop.next_route) {
        localStorage.nextRoute = JSON.stringify(this.prop.next_route);
      }
      this.$root.$emit('bv::show::modal', 'auth-modal');
    },
  },
};
</script>

<style lang="scss">
.need-auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;

    span {
        text-align: center;
    }
}
</style>
