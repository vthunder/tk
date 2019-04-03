export default {
  // A helper exp-{name}-{var} class will be added to the root element
  name: 'homepage-wording',

  // Google optimize experiment id
  experimentID: '',

  // [optional] specify number of sections for MVT experiments
  // sections: 1,

  // [optional] maxAge for a user to test this experiment
  // maxAge: 60 * 60 * 24, // 24 hours,

  // [optional] Enable/Set experiment on certain conditions
  // isEligible: ({ route }) => route.path !== '/foo'

  // Implemented variants and their weights
  variants: [
    { weight: 0 }, // default variant
    { weight: 0 },
    { weight: 0 },
  ],
}
