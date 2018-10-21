<template>
    <RequireSignIn>
        <div class="container section">
            <b-card no-body>
                <b-row>
                    <b-col cols="4" md="3">
                        <b-nav class="admin-nav" vertical pills variant="secondary">
                            <b-nav-item :to="{ name: 'admin-coupon' }">Coupons</b-nav-item>
                        </b-nav>
                    </b-col>
                    <b-col class="admin-page-content" cols="8" md="9">
                        <slot></slot>
                    </b-col>
                </b-row>
            </b-card>
        </div>
    </RequireSignIn>
</template>

<script>
import RequireSignIn from '@/components/RequireSignIn.vue';

export default {
  components: {
    RequireSignIn,
  },
};
</script>

<style lang="scss">
.admin-nav.nav-pills {
    border-right: 1px solid lightgray;
    height: 100%;

    .nav-link {
        color: gray;
    }
    .nav-link.active {
        color: white;
        background-color: gray;
    }
}
.admin-page-content {
    padding: 20px;
}
</style>
