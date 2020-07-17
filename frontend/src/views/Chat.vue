<template>
  <div class="chat primary" v-scroll:#chatWindow="scrollToBottom()">
    <Header :title="title" />
    <Sidebar v-model="title" />
    <!-- @toggleDrawer="drawer != drawer" -->

    <!-- Chat window -->
    <!-- Render the most recent 10 messages,
    wrap the rest inside a v-lazy component?-->
    <v-container class="secondary pl-3 pr-6" id="chatWindow" fluid>
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :is-owned="false/*index % 3 == 0*/"
        :content="message.text"
        :name="message.user.username"
        :timestamp="new Date(message.createdAt)"
      />
    </v-container>

    <!-- Send Message bar -->
    <v-app-bar app bottom class="secondary" flat fluid id="sendBar" scroll-target>
      <v-textarea
        append-outer-icon="mdi-send"
        auto-grow
        background-color="accent"
        id="textArea"
        clearable
        :color="this.colors.green"
        dark
        dense
        flat
        hide-details="auto"
        outlined
        placeholder="Type a message..."
        rows="auto"
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
import * as services from "../services";

import Message from "@/components/Message";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
//import messageService from '@/services/index.js'

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
      title: "# Coding Interns",
      messages: {},
      newMessage: null,
      colors: {
        green: "#6eba7f"
      }
      // windowHeight: null,
      // rules: {
      //   required: v => !!v || "This field is required"
      // }
    };
  },
  methods: {
    fetchMessages() {
      services.messageService.find({}).then(messages => {
        console.log(messages);
        this.messages = messages.data;
      }).catch(e => {
        console.log("fetchMessages error: ", e)
      });
    },
    sendMessage() {
      services.messageService.create({
        text: this.newMessage,
      });
      this.newMessage = '';
      // .then((message) => {
      //   this.messages.push(message);
      //   this.newMessage = '';
      // });
    },
    scrollToBottom() {
      this.$vuetify.goTo(9999, { duration: 0 });
    }
  },
  created() {
    // this.windowHeight = document.getElementById("chatWindow").clientHeight;
    services.messageService.on('created', message => {
      console.log('Created a message', message);
      this.messages.push(message)
    });
    this.fetchMessages();
  },
};
</script>

<style>
/*  */
/* .chat {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
} */
/* Ideally would like to change the color of 
the text cursor, as it is hard to see
when hovering over the text area. */
/* .chat #textArea {
  cursor: pointer;
} */
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
