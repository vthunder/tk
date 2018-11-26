<template>
    <b-container class="my-4">
        <h2 class="text-center">The Makerspace</h2>

        <div class="row justify-content-center">
            <div class="col-md-10">
                <p>Tinker Kitchen is full of specialized,
                    commercial-grade equipment and hard-to-find
                    ingredients like modernist powders, liquid
                    nitrogen, and more.</p>

                <p>We’re a community space open to everyone, and we
                    have plenty of space to cook, eat, or hang out—by
                    yourself or with friends—all with a flexible
                    makerspace-style schedule.</p>

                <div class="text-center">
                    <img src="/images/Equipment-collage.jpeg" width="70%"/>
                    <p class="mx-auto small" style="max-width: 50%;">
                        A random sampling of our equipment: coffee
                        roaster with digital probes, searzall, pasta
                        extruder, liquid nitrogen, and chocolate
                        temperers</p>
                </div>

                <p>We're a little obsessed with kitchen
                    equipment. Tinker Kitchen is a bit like a "kitchen
                    playground" where home cooks can have access to
                    the commercial machines which restaurants and
                    specialty food makers use.</p>

                <p>Our cook line has multiple ovens, including a
                    German-made "combi oven" with built-in
                    humidity/steam control, commercial deep-fryer, and
                    even a real wok range.</p>

                <p>We also have a commercial pasta extruder, at least
                    three ways of making ice cream (batch freezer,
                    Pacojet, and even liquid nitrogen). We have
                    chocolate-making tools—for tempering and making
                    bonbons, as well as for making it bean-to-bar. And
                    coffee—from a drum roaster to a dual-boiler
                    espresso machine.</p>

                <p>Then there's the lab equipment for modernist
                    cooking&mdash;two centrifuges (a refrigerated one
                    and a spinzall), dehydrator, freeze drier, chamber
                    vacuum, and a selection of the powders and
                    chemicals you need to make foams, gels, spherify,
                    and more.</p>
            </div>
        </div>

        <h3 class="text-center my-4">Equipment List</h3>

        <p>We're still working on compiling a full list, but here are
            the highlights!</p>

        <b-table :items="items" :fields="fields" striped outlined></b-table>
    </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          item: 'Combi oven',
          how_many: 1,
          make: 'RATIONAL',
          about: 'Combi ovens are amazing. They can inject steam and regulate humidity while cooking.',
        },
        {
          item: 'Convection oven',
          how_many: 2,
          make: 'Baker\'s Pride',
          about: 'Great commercial ovens that fit full sheet pans. We have a stack of 2.',
        },
        {
          item: 'Range & oven',
          how_many: 1,
          make: 'CPG',
          about: 'Commercial 6-burner gas range with conventional full size oven underneath.',
        },
        {
          item: 'Deep fryer',
          how_many: 1,
          make: 'Pitco',
          about: 'We\'ll probably swap out this fryer for a smaller one. It needs too much oil!',
        },
        {
          item: 'Wok range',
          how_many: 1,
          make: 'CPG',
          about: 'Having a real wok range is amazing. It\'s 120,000 BTU! Super powerful.',
        },
        {
          item: 'Chocolate temperer',
          how_many: 2,
          make: 'Chocovision',
          about: 'Tempering makes chocolate shiny and snappy. Our 2 temperers make it super easy to do.',
        },
        {
          item: 'Wet grinder',
          how_many: 1,
          make: 'Premier',
          about: 'Used to grind semi-liquid things. Notably, you can use them to make chocolate bean-to-bar.',
        },
        {
          item: 'Coffee roaster',
          how_many: 2,
          make: 'Freshroast/Quest',
          about: 'We have an air roasters (fast and good for darker roasts), and a drum roaster (slower, more precise). Super fun to use.',
        },
        {
          item: 'Centrifuge',
          how_many: 2,
          make: 'Jouan/Spinzall',
          about: 'Separate liquids by density: make clear liquids, make unique things like pea butter (!)',
        },
        {
          item: 'Freeze dryer',
          how_many: 1,
          make: 'HarvestRight',
          about: 'Make fruit powders, camping meals, and some crazy experiments. But be patient, it\'s slow.',
        },
        {
          item: 'Pasta extruder',
          how_many: 1,
          make: 'Bottene',
          about: 'Our commercial extruder is a beaut. You\'ll love the shapes and versatility.',
        },
        {
          item: 'Flour mill',
          how_many: 1,
          make: 'Mockmill',
          about: 'Make your own flours from grain!',
        },
        {
          item: 'Pressure cooker',
          how_many: 2,
          make: 'Kuhn Rikon/Instant Pot',
          about: 'Yes, we even have an instant pot.',
        },
        {
          item: 'Blender',
          how_many: 1,
          make: 'Vitamix',
          about: 'Blend all the things.',
        },
        {
          item: 'Mixer',
          how_many: 1,
          make: 'Kitchen-aid',
          about: 'Classic mixer with attachments.',
        },
        {
          item: 'Food processor',
          how_many: 2,
          make: 'Robot coupe/Cuisinart',
          about: 'I bet you haven\'t tried a commercial robot coupe food processor before.',
        },
        {
          item: 'Fondue pot',
          how_many: 1,
          make: 'Cuisinart',
          about: 'You really don\'t need to own one.',
        },
        {
          item: 'Dehydrator',
          how_many: 1,
          make: 'Excalibur',
          about: 'Make your own dried fruit, jerky, and more.',
        },
        {
          item: 'Ice grinder',
          how_many: 1,
          make: 'n/a',
          about: 'Have a sno-cone party. Make SE Asian "ice kachang."',
        },
        {
          item: 'Ice cream maker',
          how_many: 2,
          make: 'Lello/Paco Jet',
          about: 'We have various ice cream machines, including a batch freezer and a paco jet.',
        },
        {
          item: 'Panini press',
          how_many: 1,
          make: 'Waring',
          about: 'A commercial panini press, for extra crispy cheesy goodness.',
        },
        {
          item: 'Immersion circulator',
          how_many: '5?',
          make: 'Misc',
          about: 'We have so many sous vide machines, we lost count.',
        },
      ],
      fields: [
      ],
    };
  },
  metaInfo: {
    title: 'Space & Equipment',
  },
};
</script>
