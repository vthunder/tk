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
        <b-card-group deck class="mb-4">
            <b-card img-src="/images/Press Logos/SF_Chronicle.svg"
                    img-alt="San Francisco Chronicle"
                    bg-variant="light">
                <div slot="footer">
                    <a href="https://www.sfchronicle.com/recipes/article/Tinker-Kitchen-aims-to-bring-a-science-minded-12486026.php"
                       class="card-link">Read more</a>
                </div>
            </b-card>
            <b-card img-src="/images/Press Logos/Mission-Local-Logo.png"
                    img-alt="Mission Local"
                    bg-variant="light">
                <div slot="footer">
                    <a href="https://missionlocal.org/2018/01/sfs-mission-will-have-seven-cooking-schools/"
                       class="card-link">Read more</a>
                </div>
            </b-card>
            <b-card img-src="/images/Press Logos/Make_logo.svg"
                    img-alt="Make:"
                    bg-variant="light">
                <div slot="footer">
                    <a href="https://makezine.com/2016/08/01/5-reasons-why-chefs-need-hackerspaces/"
                       class="card-link">Read more</a>
                </div>
            </b-card>
            <b-card img-src="/images/Press Logos/Marc Guzman.jpg"
                    img-alt="Marc Guzman Podcast"
                    bg-variant="light">
                <div slot="footer">
                    <a href="https://www.facebook.com/MarcGuzmanHomes/posts/2125236250827318"
                       class="card-link">Listen</a>
                </div>
            </b-card>
        </b-card-group>
        <h4>Media Resources</h4>
        <b-row>
            <b-col md="6" class="boilerplate">
                <h6>Short Description</h6>
                <p class="mb-3">Tinker Kitchen is a new maker space
                for food hackers in the Mission in San Francisco fully
                loaded with all the greatest equipment. Members can
                come anytime and practice cooking techniques, develop
                personal projects, or just hang out and connect with
                others.</p>
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

<style lang="scss" scoped>
h4 {
    margin: 2em 0 .75em;
    text-align: center;
}
.card {
    max-width: 400px;
    img {
        height: 3em;
        padding: .5em;
    }
    a.card-link {
        display: block;
        text-align: center;
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
