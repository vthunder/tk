<template>
    <RequireSignIn>
        <div class="container section">
            <b-card no-body>
                <b-row>
                    <b-col cols="4" md="3">
                        <b-nav class="member-nav" vertical pills variant="secondary">
                            <b-nav-item to="/member/membership">Membership</b-nav-item>
                            <b-nav-item to="/member/daypasses'">Day Passes</b-nav-item>
                            <b-nav-item to="/member/billing">Billing</b-nav-item>
                        </b-nav>
                    </b-col>
                    <b-col cols="8" md="9">
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
.member-nav.nav-pills {
    .nav-link {
        color: gray;
    }
    .nav-link.active {
        color: white;
        background-color: gray;
    }
}
</style>
