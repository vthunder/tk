<template>
  <div class="home">
      <div class="jumbotron">
          <div class="hero container justify-content-center">
              <h1>Tinker Kitchen</h1>
              <h3>A cooking makerspace in San Francisco<br>
                  for learning and experimenting with food.</h3>
          </div>
          <div class="row justify-content-end">
              <div v-if="enable_ks" class="header-cta bg-dark text-white">
                  Now on Kickstarter! Check out our page and watch our video.<br/>
                  <div class="row justify-content-center">
                      <b-button variant="primary" href="https://www.kickstarter.com/projects/20846993/tinker-kitchen">View on Kickstarter</b-button>
                  </div>
              </div>
              <div v-else class="header-cta bg-dark text-white">
                  <MailingListSignup :cta=header.cta />
              </div>
          </div>
      </div>

      <div class="container section">
          <h2 id="about">What is Tinker Kitchen?</h2>
          <div class="row justify-content-center">
              <div class="col-md-6">
                  <img src="/images/Screen-Shot-2016-09-18-at-6.01.43-PM.png"
                       :srcset=whatIs.srcset
                       :sizes=whatIs.sizes
                       class="float-left">
              </div>
              <div class="col-md-4">
                  <p>Tinker Kitchen is an awesome cooking makerspace with specialized,
                      commercial-grade equipment and hard-to-find ingredients like modernist
                      powders, liquid nitrogen, and more.</p>
                  <p>We’re a community space open to everyone, and we have plenty of space to
                      cook, eat, or hang out—by yourself or with friends—all with a flexible
                      makerspace-style schedule. Come by anytime!</p>
              </div>
          </div>
      </div>

      <div class="section-image tinker-with-us-image"></div>

      <div class="container section">
          <h2>What can you do at Tinker Kitchen?</h2>

          <div class="row justify-content-center">
              <div class="feature-table col-md-8 col-lg-6">
                  <h4>Personal use</h4>
                  <ul class="list-unstyled">
                      <li>Experiment with specialized &amp; commercial cooking equipment</li>
                      <li>Take a class and level up your cooking skills</li>
                      <li>Pursue personal cooking projects in our awesome space</li>
                      <li>Join a cooking club</li>
                      <li>Host a dinner party or group celebration</li>
                  </ul>
              </div>
          </div>
          <div class="row justify-content-center">
              <div class="feature-table col-md-5">
                  <h4>Groups</h4>
                  <ul class="list-unstyled">
                      <li>Hold small team off-sites with a cooking-themed activity</li>
                      <li>Book a private event and have the whole space to yourself</li>
                  </ul>
              </div>
              <div class="feature-table col-md-5">
                  <h4>Commercial use</h4>
                  <ul class="product-card-features with-button-actions tmp w-list-unstyled">
                      <li>Develop new recipes and create new food products</li>
                      <li>Produce small food batches (in the off-hours)</li>
                      <li>Test your creations via special micro pop-up events</li>
                  </ul>
              </div>
          </div>
      </div>

      <div class="section-image join-us-image"></div>

      <div class="container section">
          <h2 id="pricing">Memberships &amp; Passes</h2>

          <div class="row justify-content-center">
              <div class="col-md-10">
                  <p>Ready to embark on your own cooking adventures? Get out of your tiny apartment
                      kitchen! Join us at our gorgeous 1700sqft space for all your personal
                      cooking projects.</p>
              </div>
          </div>
          <div class="row justify-content-center">
              <div class="feature-table col-md-5 d-flex flex-column justify-content-between">
                  <div>
                      <h4>Monthly membership</h4>
                      <ul class="list-unstyled">
                          <li>Use our makerspace as often as you want</li>
                          <li>Access all our gadgets and equipment</li>
                          <li>Join our culinary clubs, make friends, learn something new</li>
                          <li>Bring a guest for free whenever you visit.</li>
                          <li>Host a dinner party! We&#x27;ll even help you with the dishes.</li>
                          <li>We&#x27;ll receive your monthly CSA, Blue Apron, or other cooking box
                              for you, so you can just come and cook (subject to space
                              availability)</li>
                          <li>Get discounts on classes, specialized ingredients, and events</li>
                          <li>Get invites for special member-only events (pop-up dinners, guest
                              speakers, beta-test new gadgets, and more)</li>
                      </ul>
                  </div>
                  <div class="product-card-price">
                      <div><del>$150/month</del><br>Launch pricing: $125/month</div>
                      <b-button :to="{ name: 'learn-membership' }"
                                variant="primary" class="mt-2">Learn more</b-button>
                  </div>
              </div>
              <div class="feature-table col-md-5 d-flex flex-column justify-content-between">
                  <div>
                      <h4>Day pass</h4>
                      <ul class="list-unstyled">
                          <li>Use our makerspace for a day</li>
                          <li>Access all our gadgets and equipment</li>
                          <li>Attend open events and activities on the day you use your pass</li>
                      </ul>
                  </div>
                  <div class="product-card-price">
                      <div class="mb-2">
                          <del>$40/day</del><br>Launch pricing: $30/day
                      </div>
                      <RequireSignIn v-if="enable_login" post_text="to purchase"
                                     :next_route="{ name: 'member-daypasses' }"
                                     variant="secondary">
                          <b-button :to="{ name: 'member-membership' }">Purchase</b-button>
                      </RequireSignIn>
                      <div v-else style="height: 38px"></div>
                  </div>
              </div>
          </div>
      </div>

      <div class="container section">
          <div class="row justify-content-center">
              <div class="col-md-10">
                  <h3>Interested?</h3>
                  <div v-if="enable_ks">
                      <div class="row justify-content-center">
                          We're live on Kickstarter right now! Back
                          our campaign and get discounted membership
                          or daily passes:
                      </div>
                      <div class="row justify-content-center">
                          <b-button variant="primary" href="https://www.kickstarter.com/projects/20846993/tinker-kitchen">Back our Kickstarter</b-button>
                      </div>
                  </div>
                  <MailingListSignup v-else variant="secondary" />
              </div>
          </div>
      </div>

      <div class="section-image whats-next-image"></div>

      <div class="container section">
          <h2 id="makerspace" class="section-heading">The Makerspace</h2>

          <div class="row justify-content-center">
              <div class="col-md-10">
                  <p>Our makerspace is divided into two areas: a hang-out/dining space and a
                      kitchen space.</p>
                  <img src="/images/TopPlan.png"
                       :srcset=theMakerspace.srcset
                       sizes="(max-width: 767px) 96vw, (max-width: 991px) 570px, 740px"
                       class="makerspace-image">

                  <p>From sous vide machines to pasta extruders to combi ovens to chocolate
                      tempering<br> machines—even liquid nitrogen and modernist
                      powders—we&#x27;ll have it all! Here&#x27;s a partial list:</p>
                  <ul>
                      <li><a href="https://www.webstaurantstore.com/rational-combimaster-plus-model-61-a619106-12-202-combi-oven-with-six-half-size-sheet-pan-capacity-208-240v-3-phase/645619112202208*2403.html">Combi oven</a></li>
                      <li><a href="https://www.amazon.com/Lello-Musso-5030-Dessert-Maker/dp/B000FIWZLO">Batch ice cream freezer</a> &amp; <a href="https://www.pacojet.com/en/">Pacojet</a></li>
                      <li><a href="http://www.bottene.net/en/portfolio-item/lillo-due">Pasta extruder</a> &amp; <a href="https://www.amazon.com/Kitchenaid-KPRA-Roller-Spaghetti-Fettuccine/dp/B000KPULR2">sheeter</a></li>
                      <li><a href="https://www.meatprocessingproducts.com/ary-vp112c.html?gclid=CJ_9qqi-98YCFQZbfgod_dUP4g">Chamber vacuum</a></li>
                      <li><a href="https://www.coffeeshrub.com/the-quest-m3s-coffee-roaster.html">Coffee roaster</a></li>
                      <li><a href="https://www.amazon.com/Cryogenic-Container-Liquid-Nitrogen-Straps/dp/B00UJ7E18Q/ref=sr_1_cc_1?s=aps&amp;ie=UTF8&amp;qid=1441325243&amp;sr=1-1-catcorr&amp;keywords=10L+dewar">Liquid nitrogen</a></li>
                      <li><a href="https://www.bakedeco.com/detail.asp?id=30401">Chocolate tempering machine</a></li>
                      <li><a href="https://www.webstaurantstore.com/excalibur-3926tw-white-nine-rack-food-dehydrator-with-timer-600w/3583926TW.html">Dehydrator</a></li>
                      <li><a href="https://en.wikipedia.org/wiki/Centrifuge">Refrigerated centrifuge</a></li>
                      <li><a href="https://www.nomiku.com/">Sous vide circulators</a></li>
                      <li><a href="https://www.amazon.com/Premier-Wonder-Table-Grinder-110v/dp/B004OPIBV2">Wet grinder</a></li>
                      <li>Refractometer, reference thermometer, Searzall, and more!</li>
                  </ul>
              </div>
          </div>

          <h2 class="section-heading text-center">Location</h2>

          <iframe width="100%" height="450" frameborder="0" style="border:0"
                  :src=maps.src
                  allowfullscreen></iframe>
      </div>

      <div class="about-section">
          <div class="container section">
              <h2>About the founder</h2>

              <img src="/images/jhPEUGQ9.jpeg" width="128" class="mugshot-image">

              <div class="row justify-content-center">
                  <div class="col-md-10">
                      <p>Hi, I’m Dan Mills.</p>
                      <p>Food and cooking have always been a hobby for me, and I’ve always had a
                          love for kitchen equipment and the science of food. From my childhood
                          in Venezuela through my career in the tech industry I’ve slowly expanded
                          my arsenal of tastes, techniques and equipment, always tinkering with
                          something new. In 2015 I started Tinker Kitchen to build an awesome maker
                          space for food where I can share this passion with others.</p>
                      <p>The seed for this concept dates back to my college days, where I had the
                          good fortune to take a very special biology course. Makerspaces weren’t
                          really a thing back then, but that’s exactly what this was: a sculptor
                          and a bio prof had a lab in the basement to explain real-world structures
                          and processes by building physical models. We studied biological
                          organisms, did research, and built models to explain them. I discovered
                          that this learning style is not only great fun, but immensely effective:
                          I can still remember the things I learned back then, even though it’s been
                          almost two decades.<a href="#" class="link"></a></p>
                      <p>That is how I approach cooking as well. I am not only interested in the end
                          product, but in learning the underlying principles. And there is no better
                          way to learn than by having hands-on fun in a highly creative makerspace,
                          with all the tools you could ever dream of, and a community to lend a
                          hand.<a href="#" class="link"></a></p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import RequireSignIn from '@/components/RequireSignIn.vue';
import MailingListSignup from '@/components/MailingListSignup.vue';

export default {
  data() {
    // elaborate workaround for eslint line-length errors
    return {
      enable_login: process.env.VUE_APP_ENABLE_LOGIN === 'true',
      enable_ks: process.env.VUE_APP_ENABLE_KS === 'true',
      header: {
        cta: 'Coming soon to the SF Mission District. ' +
             'Sign up to hear the latest and get on our membership waitlist.',
      },
      whatIs: {
        srcset: '/images/Screen-Shot-2016-09-18-at-6.01.43-PM-p-500x378.png 500w, ' +
                '/images/Screen-Shot-2016-09-18-at-6.01.43-PM-p-800x604.png 800w, ' +
                '/images/Screen-Shot-2016-09-18-at-6.01.43-PM-p-1080x815.png 1080w, ' +
                '/images/Screen-Shot-2016-09-18-at-6.01.43-PM-p-1600x1207.png 1600w, ' +
                '/images/Screen-Shot-2016-09-18-at-6.01.43-PM.png 1856w',
        sizes: '(max-width: 479px) 96vw, (max-width: 767px) 58vw, (max-width: 991px) 342px, 444px',
      },
      theMakerspace: {
        srcset: '/images/TopPlan-p-500x178.png 500w, ' +
                '/images/TopPlan-p-800x285.png 800w, ' +
                '/images/TopPlan.png 987w',
      },
      maps: {
        src: '//www.google.com/maps/embed/v1/place?q=' +
             'place_id:ChIJu3WgID9-j4ARp-tuXllo1y8&key=AIzaSyBY6GbaztLA3fPKcxuK1JTOlzvGkJJ-DzI',
      },
    };
  },
  components: {
    MailingListSignup,
    RequireSignIn,
  },
};
</script>

<style lang="scss" scoped>
.jumbotron {
    background: url('/images/MakerFaire-LN_Demo.jpg');
    background-position: center;
    background-size: cover;
    border-radius: 0;
    min-height: 300px;
}
@media (min-width: 576px) {
    .jumbotron { min-height: 400px; }
}
@media (min-width: 768px) {
    .jumbotron { min-height: 480px; }
}
@media (min-width: 992px) {
    .jumbotron { min-height: 560px; }
}
@media (min-width: 1200px) {
    .jumbotron { min-height: 600px; }
}

.jumbotron .hero {
    color: white;
    padding-top: 100px;
    text-align: center;
}
@media (min-width: 992px) {
    .jumbotron .hero { padding-top: 150px; }
}

.jumbotron .header-cta {
    border-radius: 5px;
    font-size: 14px;
    font-weight: 300;
    margin: 75px 5px 0;
    padding: 10px;
    width: 100%;
}
.header-ml-signup .cta-text {
    margin-bottom: 5px;
}
.header-ml-signup input {
    border: none;
    font-size: 14px;
}
.header-ml-signup button {
    background-color: #ff7911;
    border: none;
    box-shadow: 0 3px 0 0 #aa3400;
    transition: background-color 250ms;
}
.header-ml-signup button:hover {
    background-color: #cc4600;
}
@media (min-width: 576px) {
    .jumbotron .header-cta { width: 400px; }
    .header-ml-signup input { font-size: 16px; }
}

.need-auth {
    height: unset;
}
</style>
