import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#373737",
        secondary: "#4f4f4f",
        accent: "#828282",
      },
    },
  },
});
