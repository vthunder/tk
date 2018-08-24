<template>
    <div class="footer-section bg-dark text-white">
        <div class="container section">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <MailingListSignup variant="secondary" />
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

<style lang="scss">
.footer-section {
    padding-top: 15px;
}
.footer-section .section {
    margin-top: 0;
    margin-bottom: 0;
}

.footer-ml-signup input,
.footer-ml-signup button {
    border: none;
    height: 54px;
    margin-top: 10px;
}
.footer-ml-signup button {
    background-color: #ff7911;
    box-shadow: 0 3px 0 0 #aa3400;
    padding: 6px 36px;
    transition: background-color 250ms;
}
.footer-ml-signup button:hover {
    background-color: #cc4600;
}
.footer-social-links {
    padding: 20px 0;
    text-align: center;
}
.footer-social-links a {
    padding-left: 10px;
}
.copyright {
    color: hsla(0, 0%, 100%, .29);
    font-weight: 300;
    padding-top: 30px;
    text-align: center;
}
.social-icon {
    opacity: 0.8;
    transition: opacity 250ms;
}
.social-icon:hover {
    opacity: 1;
}
</style>
