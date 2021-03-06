<template>
  <div class="home">
    <div class="jumbotron">
      <b-row>
        <b-col md="7" lg="8">
          <div class="hero container justify-content-center">
            <h1 class="home-page">Tinker Kitchen</h1>
            <h3>A cooking makerspace in San Francisco<br>
              for learning and experimenting with food.</h3>
          </div>
        </b-col>
        <b-col md="5" lg="4">
          <b-card class="main-nav" bg-variant="dark" text-variant="white">
            <nuxt-link :to="{ name: 'classes' }" class="card-link">
              <div class="header-card">
                <img src="/images/15408755594_87a6c22584_o square.jpg">
                <h4>Take a class →</h4>
              </div>
            </nuxt-link>
            <nuxt-link :to="{ name: 'day-passes' }" class="card-link">
              <div class="header-card">
                <img src="/images/928804_432342363614597_1945912251_n.jpg">
                <h4>Buy a day pass →</h4>
              </div>
            </nuxt-link>
            <nuxt-link :to="{ name: 'membership' }" class="card-link">
              <div class="header-card">
                <img src="/images/MakerFaire-LN_Demo.jpg">
                <h4>Become a member →</h4>
              </div>
            </nuxt-link>
            <nuxt-link :to="{ name: 'groups' }" class="card-link">
              <div class="header-card">
                <img src="/images/44511992_194691154803338_393358455199342745_n.jpg">
                <h4>Team building events →</h4>
              </div>
            </nuxt-link>
          </b-card>
        </b-col>
      </b-row>
      <i class="fas fa-angle-double-down text-white"/>
    </div>

    <b-container id="firstSection" class="mt-4">
      <b-row class="justify-content-center">
        <b-col md="8">
          <p>
            Tinker Kitchen is a <strong>makerspace for cooking</strong>:
            our members can come to our space anytime and
            cook whatever personal projects they like (or
            just hang out!). We have a no-reservation
            system. Just check <nuxt-link :to="{ name: 'calendar' }">our
            calendar</nuxt-link>, and drop by during
            <nuxt-link :to="{ name: 'about' }">open hours</nuxt-link>.
          </p>
          <p>
            We also host a variety of <nuxt-link :to="{ name: 'classes' }">cooking
            classes</nuxt-link>, as well as team building
            events and other group gatherings.
          </p>
          <p>
            Our kitchen has just about every cooking gadget
            imaginable. If you love to cook, this place is
            for you! Check out our <nuxt-link :to="{ name: 'about' }">
            long list of equipment</nuxt-link>.
          </p>
          <p>
            Tinker Kitchen is not a cafe or restaurant. But if you're
            looking to get into the food business, we can be your
            launching pad! Learn about
            <nuxt-link :to="{ name: 'commercial' }">commercial use</nuxt-link> of
            our kitchen.
          </p>
        </b-col>
      </b-row>
      <b-row class="my-2">
        <b-col sm="4">
          <a href="/images/Space photos/IMG_2581.jpg">
            <img class="space-img" src="/images/Space photos/IMG_2581.jpg">
          </a>
        </b-col>
        <b-col sm="4">
          <a href="/images/Space photos/IMG_2576.jpg">
            <img class="space-img" src="/images/Space photos/IMG_2576.jpg">
          </a>
        </b-col>
        <b-col sm="4">
          <a href="/images/Space photos/IMG_2573.jpg">
            <img class="space-img" src="/images/Space photos/IMG_2573.jpg">
          </a>
        </b-col>
      </b-row>
      <div class="text-center mt-4">
        Give the gift of cooking with a
        <nuxt-link :to="{ name: 'gift-certificates' }">
          Tinker Kitchen gift certificate
        </nuxt-link>!
      </div>
    </b-container>
  </div>
</template>

<script>
  import * as auth from '../graphql/auth';

export default {
  data() {
    return {
      me: {},
      subpage: false,
    };
  },
  apollo: {
    me: {
      query: auth.query.me,
      update(data) {
        if (data && data.me) return data.me;
        return {};
      },
    },
  },
  watch: {
    subpage(newValue) {
      this.$root.$emit('tk::nav::subpage', newValue);
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    if (this.me.is_member) {
      // redirect to member page
    }
  },
  methods: {
    updateScroll() {
      const firstSectionOffset = this.$el.querySelector('#firstSection').offsetTop;
      const distance = firstSectionOffset - window.scrollY;
      this.subpage = distance < 60;
    },
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll);
  },
  head() {
    return {
      title: 'Home',
    };
  },
};
</script>

<style lang="scss" scoped>

@import "~/assets/scss/_section-image.scss";

#app .navbar + div {
    @media (min-width: 768px) { padding-top: 0px; }
    @media (min-width: 992px) { padding-top: 0px; }
    @media (min-width: 1200px) { padding-top: 0px; }
    @media (min-width: 1400px) { padding-top: 0px; }
}

h1.home-page {
    font-size: 3rem;
    line-height: 2.5rem;
    text-shadow: 0 1px 0 rgba(0, 0, 0, .73), 0 2px 4px rgba(0, 0, 0, .19);
    @media (min-width: 768px) {
        font-size: 4.25rem;
        line-height: 3.5rem;
    }
}

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

    .main-nav {
        .header-card { min-width: 289px; }
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

  .space-img {
    width: 100%;
  }

  .what-can-you-do-section {
    .card-img-top {
        @media (min-width: 768px) { height: 120px; }
        @media (min-width: 996px) { height: 180px; }
        @media (min-width: 1200px) { height: 200px; }
    }
}

.join-us-image {
    @extend .section-image;
    background: url('/images/Making-Chocolate.jpg');
    background-position: 100% 80%;
}

.whats-next-image {
    @extend .section-image;
    background: #ccccc9 url('/images/Screen-Shot-2016-09-18-at-6.01.43-PM.png');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain, auto !important;
}

.need-auth {
    height: unset;
}

.header-card {
    background-color: #3D3D3D;
    border: 2px solid #636363;
    border-radius: 4px;

    &:hover {
        background-color: #636363;
    }

    * { display: inline; }
    img {
        border-radius: 4px 0 0 4px;
        height: 5em;
    }
    h4 {
        margin-left: .75em;
        font-weight: 600;
    }
}
</style>
