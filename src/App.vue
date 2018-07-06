<template>
    <div id="app">
        <Nav/>
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
import WelcomeModal from './components/WelcomeModal.vue'; // @ not working here?

export default {
  components: {
    Nav,
    Footer,
    AuthModal,
    WelcomeModal,
  },
};
</script>

<style lang="scss">
 @import "./styles/app.scss";
</style>
