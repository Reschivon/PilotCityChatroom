<template>
  <div class="chat" v-scroll:#chatWindow="scrollToBottom()">
    <Header :title="currentRoom.name" />
    <Sidebar v-model="currentRoom" :rooms="rooms" :currentUser="currentUser"/>
    <!-- @toggleDrawer="drawer != drawer" -->

    <!-- Chat window -->
    <!-- Idea: render the most recent 10 messages,
    wrap the rest inside a v-lazy component so they don't 
    need to load immediately?-->
    <v-main>
      <v-container class="secondary pl-3 pr-6 mb-n8" id="chatWindow" fluid>
        <Message
          v-for="(message, index) in currentMessages"
          :key="index"
          :is-owned="message.user._id == currentUser._id"
          :content="message.text"
          :name="message.user.username"
          :timestamp="formatTime(message.createdAt)"
          :group-with-prev-msg="sameSenderAndTime(message, currentMessages[index - 1])"
        />
      </v-container>
    </v-main>

    <!-- Send Message bar -->
    <v-footer app inset class="secondary pa-3">
      <v-textarea
        append-outer-icon="mdi-send"
        auto-grow
        autofocus
        background-color="accent"
        clearable
        :color="this.colors.green"
        dark
        dense
        flat
        hide-details="auto"
        id="textArea"
        outlined
        placeholder="Type a message..."
        rows="auto"
        v-model="newMessage"
        @click:append-outer="sendMessage"
        @keydown.enter.exact.prevent="sendMessage"
      ></v-textarea>
    </v-footer>

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
import moment from "moment";

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
      currentUser: {},
      currentRoom: {},
      rooms: [],
      allMessages: [],
      // formattedTimes: [],
      newMessage: null,
      colors: {
        green: "#6eba7f"
      },
      // Possible field validation for empty text area
      // windowHeight: null,
      // rules: {
      //   required: v => !!v || "This field is required"
      // }
    };
  },
  computed: {
    currentMessages() {
      return this.allMessages.filter(message => message.room == this.currentRoom._id?? []);
    },
  },

  methods: {
    fetchRooms() {
      services.roomService.find({}).then(rooms => {
        console.log("rooms", rooms)
        this.rooms = rooms.data;
        if (this.rooms.length == 0) {
          // redirect to join room page
        } else {
          this.currentRoom = this.rooms[0];
        }
      }).catch(e => {
        console.log("fetchRooms error: ", e);
      });
    },
    fetchMessages() {
      services.messageService
        .find({})
        .then(messages => {
          console.log("messages", messages);
          this.allMessages = messages.data;
        })
        .catch(e => {
          console.log("fetchMessages error: ", e);
        });
    },

    sendMessage() {
      services.messageService.create({
        room: this.currentRoom._id,
        text: this.newMessage,
      });
      this.newMessage = "";
    },
    formatTime(time) {
      let formattedTime = moment(time).calendar();
      // this.formattedTimes.push(formattedTime);
      // console.log("formattedTimes: ", this.formattedTimes);
      return formattedTime;
    },
    scrollToBottom() {
      this.$vuetify.goTo(9999, { duration: 0 });
    },
    sameSenderAndTime(msg, prevMsg) {
      if (prevMsg) {
        let msgTime = moment(msg.createdAt).calendar();
        let prevMsgTime = moment(prevMsg.createdAt).calendar();
        return msg.userId == prevMsg.userId && msgTime == prevMsgTime;
      } else return false;
    }
  },
  created() {
    // this.windowHeight = document.getElementById("chatWindow").clientHeight;
    services.client
      .reAuthenticate()
      .then(auth => {
        console.log(auth);
        this.currentUser = auth.user;
      })
      .catch(e => {
        // Prevents users from logging in if unauthenticated
        // this.$router.push({ name: "Auth" });
        console.log(e);
    });

    this.fetchRooms();
    this.fetchMessages();

    services.messageService.on("created", message => {
      console.log("Created a message", message);
      this.allMessages.push(message);
    });
  }
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