<template>
    <div class="footer-section bg-dark text-white">
        <div class="container section">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <MailingListSignup />
                    <div class="footer-social-links">
                        <span class="follow-us-text">Follow us on</span>
                        <a href="https://instagram.com/tinkerkitch/" class="social-icon"><img src="/images/Instagram-White2x.png" width="24"></a>
                        <a href="https://twitter.com/tinkerkitch" class="social-icon"><img src="/images/Twitter-White2x.png" width="24"></a>
                        <a href="https://www.facebook.com/tinkerkitchen" class="social-icon"><img src="/images/Facebook-White2x.png" width="24"></a>
                    </div>
                </div>
            </div>

            <div class="copyright">© 2018 Tinker Kitchen Inc. All rights reserved.</div>
        </div>
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
