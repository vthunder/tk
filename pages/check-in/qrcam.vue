<template>
  <div>
    <no-ssr>
      <qrcode-stream :camera="{ facingMode: 'environment' }" @decode="onDecode"/>
    </no-ssr>
  </div>
</template>

<script>
  import * as misc from '@/graphql/misc';

  const QrcodeStream =
    process.client ? require('vue-qrcode-reader').QrcodeStream : undefined;

  export default {
    components: {
      QrcodeStream,
    },
    methods: {
      async onDecode(str) {
        await this.$apollo.mutate({
          mutation: misc.mutation.check_in_qr_scan,
          variables: { qr_data: str },
        });
      },
    },
  };
</script>

<style lang="scss">
  nav.navbar, .footer { display: none !important; }
  #router-view {
    height: 100vh;
    padding: 0 !important;
  }
</style>
