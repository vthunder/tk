<template>
    <div v-if="me">
        <slot></slot>
    </div>
    <div v-else :class="'need-auth need-auth-'+prop.auth_class">
        <span v-if="enable_login">
            {{ prop.pre_text }}
            <b-button class="mx-1" :variant=prop.variant @click=showModal>
                {{ prop.btn_text }} <i v-if="prop.btn_icon" :class="'fas '+prop.btn_icon"></i>
            </b-button>
            {{ prop.post_text }}
        </span>
    </div>
</template>

<script>
import * as auth from '../graphql/auth';

export default {
  props: ['pre_text', 'btn_text', 'btn_icon', 'post_text',
    'auth_class', 'variant', 'next_route', 'next_action'],
  data() {
    return {
      me: '',
      enable_login: process.env.VUE_APP_ENABLE_LOGIN === 'true',
      prop: {
        pre_text: (this.pre_text || ''),
        btn_text: (this.btn_text || 'Sign in'),
        btn_icon: (this.btn_icon || 'fa-sign-in-alt'),
        post_text: (this.post_text || 'to access this page.'),
        auth_class: (this.auth_class || 'center'),
        variant: (this.variant || 'primary'),
        next_route: (this.next_route || ''),
        next_action: (this.next_action || ''),
      },
    };
  },
  apollo: {
    me: {
      query: auth.query.me,
      update(data) {
        if (data.me) return data.me;
        return null;
      },
    },
  },
  methods: {
    showModal() {
      if (this.prop.next_route) {
        localStorage.nextRoute = JSON.stringify(this.prop.next_route);
      }
      if (this.prop.next_action) {
        localStorage.nextAction = this.prop.next_action;
      }
      this.$root.$emit('bv::show::modal', 'auth-modal');
    },
  },
};
</script>

<style lang="scss">
.need-auth-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;

    span {
        text-align: center;
    }
}
.need-auth-plain {}
</style>
