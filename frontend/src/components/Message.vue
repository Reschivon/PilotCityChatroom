<template>
  <v-lazy>
    <v-row dense :justify="owned()" class="mt-2">
      <!-- Avatar -->
      <v-col cols="auto" v-if="!isOwned" align-self="start" class="mt-5">
        <v-avatar :color="colors.green">
          <span class="white--text headline">PC</span>
        </v-avatar>
      </v-col>
      <!-- Chat bubble -->
      <v-col cols="auto">
        <v-row>
          <v-card-subtitle class="ml-4 pa-0 white--text subtitle-2" v-if="!isOwned">{{ name }}</v-card-subtitle>
          <v-card-subtitle class="ml-2 pa-0 white--text caption" v-if="!isOwned">{{ timestamp }}</v-card-subtitle>
        </v-row>
        <v-row>
          <v-card outlined :class="rounding()" max-width="750">
            <v-card dark flat class="secondary">
              <v-card-text class="py-3">{{ content }}</v-card-text>
            </v-card>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-lazy>
</template>

<script>
export default {
  name: "Message",
  props: { isOwned: Boolean, content: String },
  data: () => {
    return {
      picture: "mdi-account",
      colors: {
        green: "#6EBA7F"
      },
      name: "Sender's Name",
      timestamp: "Today at 10:15 am"
    };
  },
  methods: {
    owned() {
      return this.isOwned ? "end" : "start";
    },
    rounding() {
      return this.isOwned
        ? "rounded-tr-xl rounded-l-xl mx-3"
        : "rounded-bl-xl rounded-r-xl mx-3";
    }
  }
};
</script>