<template>
  <div v-if="loading" class="member-verify"><h3>Loading...</h3></div>
  <div v-else class="container section member-verify">
    <p>This verification token is invalid or expired.</p>
  </div>
</template>

<script>
  import * as auth from '@/graphql/auth';

  export default {
    props: {
      token: { type: String, default: '' }
    },
    data() {
      return {
        loading: true,
      };
    },
    async mounted() {
      const { data: { verify_email: result } } = await this.$apollo.mutate({
        mutation: auth.mutation.verify_email,
        variables: { token: this.token },
      });
      if (result === 'OK') this.$router.push({ name: 'index' });
      this.loading = false;
    },
  };
</script>

<style lang="scss">
  .member-verify { height: 100vh; }
</style>
