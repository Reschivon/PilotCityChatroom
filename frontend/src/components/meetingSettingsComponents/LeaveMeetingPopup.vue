<template>
  <div>
    <v-btn
      large
      class="font-family-Raleway red accent-2 white--text"
      @click="isClicked = true"
    >
      <span>Leave Chat</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>

    <v-dialog max-width="600px" v-model="isClicked">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to leave this chat?</v-card-title
        >

        <v-card-text>
          <!-- todo leave chat -->
          <v-btn
            @click="leaveChat"
            class="font-family-Raleway red accent-2 white--text"
            >Leave</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import SettingsContent from "./SettingsContent"
export default {
  name: "Popup",
  props: {
    input: String,
    email: String
  },
  data() {
    return {
      isClicked: false
    };
  },
  methods: {
    tellClicked() {
      console.log("clicked");
    },
    leaveChat() {
      console.log("leave chat clicked");
    }
  },

  components: {
    // SettingsContent
  }
};
</script>
