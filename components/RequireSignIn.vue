<template>
  <div v-if="me.name">
    <slot/>
  </div>
  <div v-else :class="'need-auth need-auth-'+auth_class">
    <span>
      {{ pre_text }}
      <b-button :variant="variant" class="mx-1" @click="showModal">
        {{ btn_text }} <i v-if="btn_icon" :class="'fas '+btn_icon"/>
      </b-button>
      {{ post_text }}
    </span>
  </div>
</template>

<script>
  import * as auth from '../graphql/auth';

  export default {
    props: {
      pre_text: { type: String, default: '' },
      btn_text: { type: String, default: 'Sign in' },
      btn_icon: { type: String, default: 'fa-sign-in-alt' },
      post_text: { type: String, default: 'to access this page.' },
      auth_class: { type: String, default: 'center' },
      variant: { type: String, default: 'primary' },
      next_route: { type: Object, default: undefined },
      next_action: { type: Object, default: undefined },
    },
    data() {
      return {
        me: {},
      };
    },
    apollo: {
      me: auth.query.me
    },
    methods: {
      showModal() {
        if (this.next_route) {
          localStorage.nextRoute = JSON.stringify(this.next_route);
        }
        if (this.next_action) {
          localStorage.nextAction = this.next_action;
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
