<template>
  <div class="home">
      <div class="jumbotron">
          <div class="hero container justify-content-center">
              <h1 class="home-page">Tinker Kitchen</h1>
              <h3>A cooking makerspace in San Francisco<br>
                  for learning and experimenting with food.</h3>
          </div>
          <i class="fas fa-angle-double-down text-white"></i>
      </div>

      <b-container class="section what-can-you-do-section mt-4">
          <h2 class="section-heading">What can you do at Tinker Kitchen?</h2>
          <b-row>
              <b-col md="4">
                  <b-card img-src="/images/LN-Demo-500x283.jpeg"
                          img-alt="Experiment at Tinker Kitchen"
                          img-top
                          class="mt-3">
                      <h4>Memberships & passes</h4>
                      <p class="card-text">
                          Experiment and pursue your cooking projects our
                          kitchen&mdash;loaded with all the equipment you
                          could dream of.
                      </p>
                      <div class="text-center">
                          <b-button :to="{ name: 'learn-membership' }" size="sm"
                                    variant="primary">
                              Membership benefits
                          </b-button>
                      </div>
                  </b-card>
              </b-col>
              <b-col md="4">
                  <b-card img-src="/images/Filling-bonbons-500x289.jpg"
                          img-alt="Card image"
                          img-top
                          class="mt-3">
                      <h4>Classes & workshops</h4>
                      <p class="card-text">
                          Take a class and level up your cooking skills,
                          or join a cooking club and learn at your own
                          pace together with others.
                      </p>
                      <div class="text-center">
                      <b-button :to="{ name: 'calendar' }" size="sm" variant="primary">
                          Class calendar
                      </b-button>
                      </div>
                  </b-card>
              </b-col>
              <b-col md="4">
                  <b-card img-src="/images/Making-ice-cream-500x282.jpg"
                          img-alt="Card image"
                          img-top
                          class="mt-3">
                      <h4>Group & private events</h4>
                      <p class="card-text">
                          Use our kitchen for a group event: from
                          dinner parties to team off-sites, we're the
                          perfect place for your cooking activity.
                      </p>
                      <div class="text-center">
                      <b-button :to="{ name: 'groups' }" size="sm" variant="primary">
                          Group options
                      </b-button>
                      </div>
                  </b-card>
              </b-col>
          </b-row>

          <p class="mt-4 mb-4">Are you in the food industry? Learn about
              <b-link :to="{ name: 'commercial' }">commercial use</b-link> of
              our kitchen.</p>
      </b-container>

      <div class="whats-next-image"></div>

      <div class="container section">
          <h2 id="makerspace" class="section-heading">The Makerspace</h2>

          <div class="row justify-content-center">
              <div class="col-md-10">
                  <p>Tinker Kitchen is an awesome cooking makerspace
                      with specialized, commercial-grade equipment and
                      hard-to-find ingredients like modernist powders,
                      liquid nitrogen, and more.</p>

                  <p>We’re a community space open to everyone, and we
                      have plenty of space to cook, eat, or hang
                      out—by yourself or with friends—all with a
                      flexible makerspace-style schedule.</p>

                  <div class="text-center">
                      <img src="/images/Equipment-collage.jpeg" width="50%"/>
                      <p class="mx-auto small" style="max-width: 50%;">
                          A random sampling of our equipment: coffee
                          roaster with digital probes, searzall, pasta
                          extruder, liquid nitrogen, and chocolate
                          temperers</p>
                  </div>

                  <p>We're a little obsessed with kitchen
                      equipment. Tinker Kitchen is a bit like a
                      "kitchen playground" where home cooks can have
                      access to the commercial machines which
                      restaurants and specialty food makers use.</p>

                  <p>Our cook line has multiple ovens, including a
                      German-made "combi oven" with built-in
                      humidity/steam control, commercial deep-fryer,
                      and even a real wok range.</p>

                  <p>We also have a commercial pasta extruder, at
                      least three ways of making ice cream (batch
                      freezer, Pacojet, and even liquid nitrogen). We
                      have chocolate-making tools—for tempering and
                      making bonbons, as well as for making it
                      bean-to-bar. And coffee—from a drum roaster to a
                      dual-boiler espresso machine.</p>

                  <p>Then there's the lab equipment for modernist
                      cooking&mdash;two centrifuges (a refrigerated
                      one and a spinzall), dehydrator, freeze drier,
                      chamber vacuum, and a selection of the powders
                      and chemicals you need to make foams, gels,
                      spherify, and more.</p>
              </div>
          </div>
      </div>

      <div class="join-us-image"></div>

      <div class="container section">
          <h2 class="section-heading text-center">Getting There</h2>

          <p>We're in the Mission District in San Francisco.</p>

          <p><strong>Address:</strong>&nbsp;3233 22nd St<br/>
              <strong>Hours:</strong>&nbsp;10AM - 9PM, Tuesdays -
              Sundays &mdash; except for special events
              (<b-link :to="{ name: 'calendar' }">calendar</b-link>)</p>

          <p>See <b-link :to="{ name: 'learn-membership' }">membership
              & day-pass options here</b-link>. Just drop by!</p>

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
      header: {
        cta: 'Coming soon to the SF Mission District. ' +
             'Sign up to hear the latest and get on our membership waitlist.',
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
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url('/images/TK_space.jpg');
    background-position: center;
    background-size: cover;
    border-radius: 0;
    min-height: 300px;
    position: relative;
    @media (min-width: 576px) { min-height: 400px; }
    @media (min-width: 768px) { min-height: 480px; }
    @media (min-width: 992px) { min-height: 560px; }
    @media (min-width: 1200px) { min-height: 600px; }

    .hero {
        color: white;
        padding-top: 100px;
        text-align: center;
        @media (min-width: 992px) { padding-top: 150px; }
    }

    .header-cta {
        border-radius: 5px;
        font-family: museo;
        font-weight: 300;
        margin: 75px 5px 0;
        padding: 10px;
        width: 100%;
        @media (min-width: 576px) {
            font-size: .875rem;
            width: 400px;
        }
    }

    .fa-angle-double-down {
        bottom: 20px;
        display: none;
        left: 49%;
        position: absolute;
        @media (min-width: 768px) { display: block; }
    }
}

.header-ml-signup {
    .cta-text {
        margin-bottom: 5px;
    }
    input {
        border: none;
        font-size: 14px;
        @media (min-width: 576px) { font-size: 16px; }
    }
    button {
        background-color: #ff7911;
        border: none;
        box-shadow: 0 3px 0 0 #aa3400;
        transition: background-color 250ms;
    }
    button:hover {
        background-color: #cc4600;
    }
}

#what-is-tk {
    img { width: 100%; }
}

.what-can-you-do-section {
    .card-img-top {
        @media (min-width: 768px) { height: 120px; }
        @media (min-width: 996px) { height: 180px; }
        @media (min-width: 1200px) { height: 200px; }
    }
}

.need-auth {
    height: unset;
}
</style>
