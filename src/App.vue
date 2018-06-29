<template>
    <div id="app">
        <Nav/>
        <AuthModal/>
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

export default {
  components: {
    Nav,
    AuthModal,
  },
};
</script>

<style lang="scss">
 @import "./styles/app.scss";
</style>
