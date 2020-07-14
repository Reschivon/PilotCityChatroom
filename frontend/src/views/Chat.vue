<template>
  <div class="secondary chat fill-height fill-width">
    <Sidebar />
    <Header />
    <!-- @toggleDrawer="drawer != drawer" -->

    <!-- Main chat window -->
    <v-main class="fill-height">
      <v-container fluid>
        <Message
          v-for="(message, index) in messages"
          :key="index"
          :is-owned="index % 3 == 0"
          :content="message"
        />
      </v-container>
    </v-main>

    <!-- Send Message bar -->
    <v-app-bar app bottom class="secondary" flat fluid>
      <v-textarea
        append-outer-icon="mdi-send"
        auto-grow
        background-color="accent"
        class="secondary ma-0"
        clearable
        :color="this.colors.green"
        dark
        dense
        flat
        hide-details="auto"
        outlined
        placeholder="Type a message..."
        rows="1"
        v-model="newMessage"
        @click:append-outer="sendMessage"
        @keydown.enter.exact.prevent="sendMessage"
      ></v-textarea>
    </v-app-bar>

    <!-- Extra properties, maybe implement later -->
    <!-- :rules="[rules.required]" -->

    <!-- Leftover from the template: add contact popup dialog
      <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-account-card-details-outline" placeholder="Company"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="(000) 000 - 0000"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>

<script>
import Message from "@/components/Message";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default {
  name: "Chat",
  components: {
    Message,
    Sidebar,
    Header
  },
  data: () => {
    return {
      // drawer: true
      messages: [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        "Excepteur sint occaecat cupidatat non proident",
        "sunt in culpa qui officia deserunt mollit anim id est laborum"
      ],
      newMessage: null,
      colors: {
        green: "#6eba7f"
      }
      // rules: {
      //   required: v => !!v || "This field is required"
      // }
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        this.messages.push(this.newMessage);
        this.newMessage = null;
      }
    }
  }
};
</script>

<style>
.chat .chat-title {
  color: #6eba7f;
}
/* .messages {
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
} */
</style>
