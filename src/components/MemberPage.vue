<template>
    <RequireSignIn>
        <div class="container section">
            <b-card no-body>
                <b-row>
                    <b-col cols="4" md="3">
                        <b-nav class="member-nav" vertical pills variant="secondary">
                            <b-nav-item :to="{ name: 'member-membership' }">Membership</b-nav-item>
                            <b-nav-item :to="{ name: 'member-daypasses' }">Day Passes</b-nav-item>
                            <b-nav-item :to="{ name: 'member-rentals' }">Rentals</b-nav-item>
                            <b-nav-item :to="{ name: 'member-billing' }">Billing</b-nav-item>
                        </b-nav>
                    </b-col>
                    <b-col class="member-page-content" cols="8" md="9">
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
.member-page-content {
    padding: 20px;
}
</style>
