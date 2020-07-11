<template>
  <v-row dense :justify="owned()" class="mt-2">
    <v-col cols="auto" v-if="!isOwned" align-self="end" class="pb-1">
      <v-avatar :color="colors.green">
        <span class="white--text headline">PC</span>
      </v-avatar>
    </v-col>
    <v-col cols="auto">
      <v-card outlined :class="rounding()" max-width="750">
        <v-card dark flat class="secondary">
          <v-card-text>{{ content }}</v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Message",
  props: { isOwned: Boolean },
  data: () => {
    return {
      // content: "This is a short message...",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      picture: "mdi-account",
      colors: {
        green: "#6EBA7F"
      }
    };
  },
  methods: {
    owned() {
      return this.isOwned ? "end" : "start";
    },
    rounding() {
      return this.isOwned
        ? "rounded-tr-xl rounded-l-xl"
        : "rounded-tl-xl rounded-r-xl";
    }
  }
};
</script>