<template>
    <div id="app">
        <Nav :subpage="this.$route.name !== 'home'" />
        <router-view/>
        <AuthModal/>
        <WelcomeModal/>
        <Footer/>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import AuthModal from '@/components/AuthModal.vue';
import WelcomeModal from '@/components/WelcomeModal.vue';
import CartBackend from '@/mixins/CartBackend';

export default {
  components: {
    Nav,
    Footer,
    AuthModal,
    WelcomeModal,
  },
  mixins: [CartBackend],
  metaInfo: {
    title: 'A Page',
    titleTemplate: '%s | Tinker Kitchen',
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
@import "~open-iconic/font/css/open-iconic-bootstrap.css";

#app .navbar + div {
    @media (min-width: 768px) { padding-top: 56px; }
    @media (min-width: 992px) { padding-top: 56px; }
    @media (min-width: 1200px) { padding-top: 56px; }
    @media (min-width: 1400px) { padding-top: 56px; }
}

.card-link {
    color: inherit;
    &:hover {
        color: inherit;
        text-decoration: none;
    }
}
</style>
