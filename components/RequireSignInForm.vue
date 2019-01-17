<template>
  <div v-if="me.name">
    <slot/>
  </div>
  <div v-else>
    <AuthForm :next_route="next_route" :next_action="next_action" />
  </div>
</template>

<script>
  import * as auth from '@/graphql/auth';
  import AuthForm from '~/components/AuthForm.vue';

  export default {
    components: {
      AuthForm,
    },
    props: {
      next_route: { type: Object, default: undefined },
      next_action: { type: Object, default: undefined },
    },
    data() {
      return {
        me: {},
      };
    },
    apollo: {
      me: auth.query.me,
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
