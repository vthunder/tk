<template>
    <div id="app">
        <Nav/>
        <AuthModal/>
        <WelcomeModal/>
        <b-button v-b-modal.welcome-modal>welcome modal</b-button>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import AuthModal from '@/components/AuthModal.vue';
import WelcomeModal from './components/WelcomeModal.vue'; // @ not working here?

export default {
  components: {
    Nav,
    AuthModal,
    WelcomeModal,
  },
};
</script>

<style lang="scss">
 @import "./styles/app.scss";
</style>
