<template>
  <v-row dense :justify="owned()" :class="styleTopSpacing()">
    <!-- Avatar -->
    <v-col cols="auto" v-if="!isOwned && shouldBeGrouped" class="mt-5">
      <v-avatar :color="colors.green" size="40">
        <span class="white--text">{{ initials }}</span>
      </v-avatar>
    </v-col>
    <!-- Chat bubble -->
    <v-col cols="8" :class="styleSideSpacing()">
      <v-row :justify="owned()">
        <v-card-subtitle
          class="ml-1 pa-0 white--text caption"
          v-if="!isOwned && shouldBeGrouped"
          >{{ name }}</v-card-subtitle
        >
        <v-card-subtitle
          class="ml-2 mr-1 pa-0 white--text font-weight-light caption"
          v-if="shouldBeGrouped"
          >{{ timestamp }}</v-card-subtitle
        >
      </v-row>
      <v-row :justify="owned()">
        <v-card outlined class="rounded-xl">
          <v-card dark flat class="secondary">
            <v-card-text class="py-2 px-3" style="white-space: pre-wrap;">{{
              content
            }}</v-card-text>
          </v-card>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Message",
  props: {
    isOwned: Boolean,
    content: String,
    name: String,
    timestamp: String,
    groupWithPrevMsg: Boolean
  },
  data: () => {
    return {
      picture: "mdi-account",
      colors: {
        green: "#6EBA7F"
      }
    };
  },
  computed: {
    initials() {
      let names = this.name.split(" ");
      let initials = "";
      names.forEach(name => (initials += name.substring(0, 1)));
      return initials;
    },
    // Created this computed property because if groupWithPrevMsg is true
    // meaning we want to group this message with the previous, then we need
    // a false value in order to hide the avatar, name, and timestamp with v-if.
    // Pretty confusing, so I thought this method might help make things easier to understand.
    // **NOTE: For use ONLY with v-if!!!**
    shouldBeGrouped() {
      return !this.groupWithPrevMsg;
    }
  },
  methods: {
    owned() {
      return this.isOwned ? "end" : "start";
    },
    // rounding() {
    //   return this.isOwned
    //   ? "rounded-tr-xl rounded-l-xl"
    //   : "rounded-bl-xl rounded-r-xl";
    // },
    styleTopSpacing() {
      return this.groupWithPrevMsg ? "mt-n1" : "mt-1";
    },
    styleSideSpacing() {
      return this.groupWithPrevMsg ? "ml-14" : "ml-2";
    }
  },
  mounted() {
    console.log(this.groupWithPrevMsg);
  }
};
</script>
