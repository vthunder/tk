<template>
    <div>
        <b-container fluid class="ml-signup mt-4 py-4">
            <b-row class="justify-content-center">
                <b-col md="10">
                    <MailingListSignup class="footer-ml-signup" variant="secondary" />
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="bg-dark text-white">
            <b-row class="footer-links justify-content-center pt-4">
                <b-col md="3" offset-md="1">
                    <ul>
                        <li><h5>Cook</h5></li>
                        <li><b-link :to="{ name: 'classes' }">Classes</b-link></li>
                        <li><b-link :to="{ name: 'learn-daypasses' }">Day passes</b-link></li>
                        <li><b-link :to="{ name: 'learn-membership' }">Membership</b-link></li>
                        <li><b-link :to="{ name: 'groups' }">Groups & Events</b-link></li>
                    </ul>
                </b-col>
                <b-col md="3">
                    <ul>
                        <li><h5>About</h5></li>
                        <li><b-link :to="{ name: 'about' }">Location & Hours</b-link></li>
                        <li><b-link :to="{ name: 'about' }">Equipment</b-link></li>
                        <li><b-link :to="{ name: 'calendar' }">Calendar</b-link></li>
                        <li><b-link :to="{ name: 'faq' }">FAQ</b-link></li>
                    </ul>
                </b-col>
                <b-col md="3">
                    <ul>
                        <li><h5>Follow</h5></li>
                        <li><b-link href="https://instagram.com/tinkerkitch/">Instagram</b-link></li>
                        <li><b-link href="https://twitter.com/tinkerkitch">Twitter</b-link></li>
                        <li><b-link href="https://www.facebook.com/tinkerkitchen">Facebook</b-link></li>
                    </ul>
                </b-col>
            </b-row>
            <div class="copyright">© 2018 Tinker Kitchen Inc. All rights reserved.</div>
            <div class="footer-links text-center">
                <b-link :to="{ name: 'tos' }">Terms</b-link> -
                <b-link :to="{ name: 'privacy' }">Privacy</b-link>
            </div>
        </b-container>
    </div>
</template>

<script>
import MailingListSignup from '@/components/MailingListSignup.vue';

export default {
  components: {
    MailingListSignup,
  },
};
</script>

<style lang="scss">
.ml-signup {
    background-color: #ccc;
}

.footer-ml-signup {
    input, button {
        border: none;
        height: 54px;
        margin-top: 10px;
    }
    button {
        background-color: #ff7911;
        padding: 6px 36px;
        transition: background-color 250ms;

        &:hover { background-color: #cc4600; }
    }
}

.footer-links {
    ul {
        list-style: none;
    }
    a {
        color: white;
        opacity: 0.8;
        transition: opacity 250ms;

        &:hover { opacity: 1; }
    }
}

.copyright {
    color: hsla(0, 0%, 100%, .29);
    font-weight: 300;
    text-align: center;
    margin-top: 2em;
}
</style>
