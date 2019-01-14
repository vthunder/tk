<template>
    <RequireSignIn>
        <div class="container section">
            <b-card no-body>
                <b-row>
                    <b-col sm="4" md="3" class="member-page-nav">
                        <b-nav class="member-nav" vertical pills variant="secondary">
                            <b-nav-item :to="{ name: 'member-account' }">Account</b-nav-item>
                            <b-nav-item :to="{ name: 'member-membership' }">Membership</b-nav-item>
                            <b-nav-item :to="{ name: 'member-daypasses' }">Day Passes</b-nav-item>
                            <b-nav-item :to="{ name: 'member-billing' }">Billing</b-nav-item>
                            <b-nav-item :to="{ name: 'member-coupon' }">Coupon/Gift Cert.
                            </b-nav-item>
                        </b-nav>
                    </b-col>
                    <b-col sm="8" md="9" class="member-page-content">
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

<style lang="scss" scoped>
.need-auth {
    height: 100vh;
}
.member-nav.nav-pills {
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
.member-page-nav {
    @media only screen and (max-width: 576px) {
        display: none;
    }
}
.member-page-content {
    padding: 20px;
}
</style>
