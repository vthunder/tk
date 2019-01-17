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
            <li><nuxt-link :to="{ name: 'classes' }">Classes</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'day-passes' }">Day passes</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'membership' }">Membership</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'groups' }">Groups & Events</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'gift-certificates' }">
              Gift Certificates</nuxt-link></li>
          </ul>
        </b-col>
        <b-col md="3">
          <ul>
            <li><h5>About</h5></li>
            <li><nuxt-link :to="{ name: 'about' }">Location & Hours</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'about' }">Equipment</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'calendar' }">Calendar</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'faq' }">FAQ</nuxt-link></li>
            <li><b-link href="https://wiki.tinkerkitchen.org/">Wiki</b-link></li>
            <li><nuxt-link :to="{ name: 'press' }">Press</nuxt-link></li>
          </ul>
        </b-col>
        <b-col md="3">
          <ul>
            <li><h5>Follow & Connect</h5></li>
            <li><b-link href="https://instagram.com/tinkerkitch/">Instagram</b-link></li>
            <li><b-link href="https://twitter.com/tinkerkitch">Twitter</b-link></li>
            <li><b-link href="https://www.facebook.com/tinkerkitchen">Facebook</b-link></li>
            <li><b-link href="https://spectrum.chat/tinker-kitchen">Community Forum</b-link></li>
          </ul>
        </b-col>
      </b-row>
      <div class="copyright">© 2018 Tinker Kitchen Inc. All rights reserved.</div>
      <div class="footer-links text-center">
        <nuxt-link :to="{ name: 'legal-terms' }">Terms</nuxt-link> -
        <nuxt-link :to="{ name: 'legal-privacy' }">Privacy</nuxt-link>
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
