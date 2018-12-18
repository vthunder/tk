<template>
    <b-container>
        <b-jumbotron class="my-4">
            <b-row>
                <b-col sm="8" lg="6">
                    <h2>News & Media Resources</h2>
                    <h6>Read more about Tinker Kitchen and download
                        our latest press assets</h6>
                </b-col>
            </b-row>
        </b-jumbotron>
        <h4>News Stories</h4>
        <b-row>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/SF_Chronicle.svg"
                             alt="San Francisco Chronicle">
                    </div>
                    <a href="https://www.sfchronicle.com/restaurants/article/Tinker-Kitchen-a-maker-space-for-food-13388060.php">
                        Maker space for cooks who can’t try this at home opens in the Mission
                    </a>
                </b-card>
            </b-col>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/Mission-Local-Logo.png"
                             alt="Mission Local">
                    </div>
                    <a href="https://missionlocal.org/2018/11/tinker-kitchen-opens-playground-for-amateur-enthusiasts-and-cooking-nerds/">
                        Tinker Kitchen opens playground for amateur enthusiasts and cooking nerds
                    </a>
                </b-card>
            </b-col>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/The_Spoon.png"
                             alt="The Spoon">
                    </div>
                    <a href="https://thespoon.tech/tinker-kitchen-is-a-maker-space-for-foodie-experimenters/">
                        Tinker Kitchen is a Maker Space for Foodie Experimenters<br><br>
                    </a>
                </b-card>
            </b-col>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/Make_logo.svg"
                             alt="Make:">
                    </div>
                    <a href="https://makezine.com/2016/08/01/5-reasons-why-chefs-need-hackerspaces/">
                        5 Reasons Why Chefs Need Hackerspaces
                    </a>
                </b-card>
            </b-col>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/Marc Guzman.jpg"
                             alt="Marc Guzman Podcast">
                    </div>
                    <a href="https://www.facebook.com/MarcGuzmanHomes/posts/2125236250827318">
                        Combining Food with Science with Dan Mills, Founder of Tinker Kitchen
                    </a>
                </b-card>
            </b-col>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/SF_Chronicle.svg"
                             alt="San Francisco Chronicle">
                    </div>
                    <a href="https://www.sfchronicle.com/recipes/article/Tinker-Kitchen-aims-to-bring-a-science-minded-12486026.php">
                        Tinker Kitchen seeks to bring a science-minded space to the Mission
                    </a>
                </b-card>
            </b-col>
            <b-col sm="6" md="4">
                <b-card bg-variant="white">
                    <div class="card-img">
                        <img src="/images/Press Logos/Mission-Local-Logo.png"
                             alt="Mission Local">
                    </div>
                    <a href="https://missionlocal.org/2018/01/sfs-mission-will-have-seven-cooking-schools/">
                        SF’s Mission will have seven cooking schools
                    </a>
                </b-card>
            </b-col>
        </b-row>
        <h4>Media Resources</h4>
        <b-row>
            <b-col md="6" class="boilerplate">
                <h6>About Tinker Kitchen</h6>
                <p class="mb-3">Tinker Kitchen is a new maker space
                    for food hackers in the Mission in San Francisco
                    fully loaded with all the greatest
                    equipment. Members can come anytime and practice
                    cooking techniques, develop personal projects, or
                    just hang out and connect with others.</p>
                <h6>Founder Bio</h6>
                <p class="mb-3">Dan is the founder of Tinker Kitchen,
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
                    <h4 class="mb-4">Media Inquiries</h4>
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
  metaInfo: {
    title: 'Press Resources',
  },
};
</script>

<style lang="scss" scoped>
h4 {
    margin: 2em 0 .75em;
    text-align: center;
}
.card {
    margin-bottom: 1em;
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

h6 {
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
