<template>
    <b-container>
        <b-jumbotron class="my-4"
                     header="News & Media Resources"
                     lead="Read more about Tinker Kitchen and download our latest press assets"
                     header-level="4">
        </b-jumbotron>

        <h2 class="text-center">News Stories</h2>
        <b-card-group v-for="i in Math.ceil(press.length / 2)" :key="i">
            <b-card v-for="item in press.slice((i - 1) * 2, i * 2)" :key="item"
                    bg-variant="white">
                <div class="card-img"><img :src="item.logo" :alt="item.publication"></div>
                <a :href="item.link">{{ item.headline }}</a>
            </b-card>
        </b-card-group>

        <h2 class="text-center mt-4">Media Resources</h2>
        <b-row>
            <b-col md="6" class="boilerplate">
                <h4>About Tinker Kitchen</h4>
                <p class="info-fact mb-3">Tinker Kitchen is a new maker space
                    for food hackers in the Mission in San Francisco
                    fully loaded with all the greatest
                    equipment. Members can come anytime and practice
                    cooking techniques, develop personal projects, or
                    just hang out and connect with others.</p>

                <h4>Founder Bio</h4>
                <p class="info-fact mb-3">Dan is the founder of Tinker Kitchen,
                    where food hackers can learn, experiment, and have
                    fun with cooking. He is a collector of kitchen
                    gadgets, big and small. Previously, Dan worked as
                    a product manager and hacker at tech nonprofits
                    Creative Commons and Mozilla.</p>
            </b-col>
            <b-col md="6" class="media-download">
                <div class="media-download-items">
                    <div>
                        <a href="https://www.dropbox.com/sh/34y7qe1iw39xs88/AABxMpyxHXw8DVh3_MgWD9BYa?dl=0">
                            <i class="fas fa-file-download fa-3x"></i>
                            Download media assets (logos, photos)
                        </a>
                    </div>
                    <div>
                        <a href="https://www.dropbox.com/s/it52110da6ef70b/Tinker%20Kitchen%20Overview.pdf?dl=0">
                            <i class="fas fa-file-pdf fa-3x"></i>
                            Download overview fact-sheet
                        </a>
                    </div>
                </div>
            </b-col>
        </b-row>

        <b-jumbotron class="contact-section my-4 pt-0 pb-4">
            <b-row>
                <b-col sm="4" offset-sm="4">
                    <h4 class="my-4">Media Inquiries</h4>
                    <b-row>
                        <b-col sm="8">
                            <div class="contact-name">Dan Mills</div>
                            <div class="contact-title">Founder</div>
                        </b-col>
                        <b-col sm="4">
                            <b-button href="mailto:press@tinkerkitchen.org"
                                      variant="primary">Contact</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-jumbotron>
    </b-container>
</template>

<script>
export default {
  data() {
    return {
      press: [
        {
          headline: 'Maker space for cooks who can’t try this at home opens in the Mission',
          publication: 'San Francisco Chronicle',
          logo: '/images/Press Logos/SF_Chronicle.svg',
          link: 'https://www.sfchronicle.com/restaurants/article/Tinker-Kitchen-a-maker-space-for-food-13388060.php',
        },
        {
          headline: 'Tinker Kitchen opens playground for amateur enthusiasts and cooking nerds',
          publication: 'Mission Local',
          logo: '/images/Press Logos/Mission-Local-Logo.png',
          link: 'https://missionlocal.org/2018/11/tinker-kitchen-opens-playground-for-amateur-enthusiasts-and-cooking-nerds/',
        },
        {
          headline: 'A Food Playground in San Francisco',
          publication: 'joie de vivre',
          logo: '/images/Press Logos/joie de vivre.png',
          link: 'https://www.jdvhotels.com/blog/a-food-playground-in-san-francisco/',
        },
        {
          headline: 'Tinker Kitchen is a Maker Space for Foodie Experimenters',
          publication: 'The Spoon',
          logo: '/images/Press Logos/The_Spoon.png',
          link: 'https://thespoon.tech/tinker-kitchen-is-a-maker-space-for-foodie-experimenters/',
        },
        {
          headline: '5 Reasons Why Chefs Need Hackerspaces',
          publication: 'Make:',
          logo: '/images/Press Logos/Make_logo.svg',
          link: 'https://makezine.com/2016/08/01/5-reasons-why-chefs-need-hackerspaces/',
        },
        {
          headline: 'Combining Food with Science with Dan Mills, Founder of Tinker Kitchen',
          publication: 'Marc Guzman Podcast',
          logo: '/images/Press Logos/Marc Guzman.jpg',
          link: 'https://www.facebook.com/MarcGuzmanHomes/posts/2125236250827318',
        },
        {
          headline: 'Tinker Kitchen seeks to bring a science-minded space to the Mission',
          publication: 'San Francisco Chronicle',
          logo: '/images/Press Logos/SF_Chronicle.svg',
          link: 'https://www.sfchronicle.com/recipes/article/Tinker-Kitchen-aims-to-bring-a-science-minded-12486026.php',
        },
        {
          headline: 'SF’s Mission will have seven cooking schools',
          publication: 'Mission Local',
          logo: '/images/Press Logos/Mission-Local-Logo.png',
          link: 'https://missionlocal.org/2018/01/sfs-mission-will-have-seven-cooking-schools/',
        },
      ],
    };
  },
  metaInfo: {
    title: 'Press Resources',
  },
};
</script>

<style lang="scss" scoped>
.jumbotron:first-child {
    background: linear-gradient(#aaa, #555);
    h1 {
        font-weight: 900;
        text-align: left;
    }
    h1, p.lead {
        color: white;
    }
}

.card {
    .card-img {
        display: flex;
        justify-content: center;
    }
    img {
        max-height: 2em;
        max-width: 100%;
        margin-bottom: .5em;
    }
}

.info-fact {
    margin: 2em 0 .75em;
    text-align: center;
}

.media-download {
    display: flex;
    justify-content: center;
    align-items: center;

    .media-download-items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;

        div {
            margin-top: 10px;
        }
    }
}

.contact-title {
    color: darkgray;
    font-size: 11pt;
}
</style>
