<template>
    <div v-if="me">
        <slot></slot>
    </div>
    <div v-else>
        <AuthForm :next_route="next_route" :next_action="next_action" />
    </div>
</template>

<script>
import * as auth from '@/graphql/auth';
import AuthForm from '@/components/AuthForm.vue';

export default {
  props: ['next_route', 'next_action'],
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
  components: {
    AuthForm,
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
