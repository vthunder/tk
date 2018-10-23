<template>
    <div v-if="loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <p>This verification token is invalid or expired.</p>
    </div>
</template>

<script>
import * as auth from '@/graphql/auth';

export default {
  props: ['token'],
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
    if (result === 'OK') this.$router.push({ name: 'member-membership' });
    this.loading = false;
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
</style>
