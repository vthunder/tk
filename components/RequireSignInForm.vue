<template>
  <div v-if="me">
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
        me: '',
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
