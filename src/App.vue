<template>
    <div id="app">
        <Nav/>
        <router-view/>
        <AuthModal/>
        <WelcomeModal/>
        <PayModal/>
        <Footer/>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import AuthModal from '@/components/AuthModal.vue';
import WelcomeModal from '@/components/WelcomeModal.vue';
import PayModal from '@/components/PayModal.vue';

export default {
  components: {
    Nav,
    Footer,
    AuthModal,
    WelcomeModal,
    PayModal,
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
@import "~open-iconic/font/css/open-iconic-bootstrap.css";
</style>
