<template>
  <!-- Took out v-model="showDrawer" from v-navigation-drawer -->
  <!-- Hiding the drawer with a button is not needed -->

  <v-navigation-drawer
    app
    class="primary"
    dark
    :clipped="$vuetify.breakpoint.lgAndUp"
  >
    <v-list dense>
      <!-- Remove searchbar until fully implemented -->
      <!-- <template>
        <v-text-field
          dense
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Find a conversation"
        ></v-text-field>
      </template>-->

      <!-- temporary button to join a room -->

      <!-- Settings -->
      <router-link to="/settings/user">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <!-- Stakeholders -->
      <v-list-group v-model="stakeholders.model">
        <v-icon color="white" slot="prependIcon">mdi-account-tie</v-icon>
        <v-icon color="white" slot="appendIcon">mdi-chevron-down</v-icon>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="white--text"
              >Stakeholders</v-list-item-title
            >
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(child, index) in stakeholders.children"
          :key="index"
          link
          :value="currentRoom"
          @click="updateCurrentRoom(child)"
        >
          <v-list-item-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ child.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-divider></v-divider>
      <div class="my-2">
        <v-btn class="ml-7" @click="joinRoom('5f1cbbd0ff53b2d78e9965f8')"
          >Join Room</v-btn
        >
      </div>
      <div class="my-2">
        <v-btn class="ml-7" @click="createRoom('My First Room')"
          >Create Room</v-btn
        >
      </div>

      <v-divider></v-divider>

      <v-subheader>Rooms</v-subheader>

      <template
        v-for="room in rooms"
        :keys="room._id.toHexString()"
        :router-to="room.route"
      >
        <v-list-item
          :key="room._id.toHexString()"
          link
          :value="currentRoom"
          @click="updateCurrentRoom(room._id)"
        >
          <v-list-item-avatar :color="room.individual ? colors.green : null">
            <span
              v-if="room.individual"
              style="width: 100%; align-items: center"
              >{{ getInitials(room.name) }}</span
            >
            <v-icon v-else>{{ room.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ room.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import * as services from "@/services";

export default {
  name: "Sidebar",
  props: {
    /*currentRoom: String,
    rooms: Array,
    currentUser: Object*/
  },
  data: () => {
    return {
      colors: {
        green: "#6EBA7F"
      },
      stakeholders: {
        model: false,
        children: [
          { icon: "mdi-account", name: "A-heel" },
          { icon: "mdi-account", name: "Prajet" },
          { icon: "mdi-account", name: "Dayrick" },
          { icon: "mdi-account", name: "Keknee" },
          { icon: "mdi-account", name: "Pokemonaca" }
        ]
      }
      //rooms: []
      //recentChats: [],
      //olderChats: [],
    };
  },
  computed: {
    rooms() {
      return this.$store.state.rooms.map(room => {
        return {
          _id: room._id,
          icon: room.members.length > 2 ? "mdi-account-group" : "mdi-account",
          name: room.name
        };
      });
    },
    currentRoom() {
      return this.$store.state.currentRoom;
    },
    currentUser() {
      return services.app.currentUser;
    },
  },
  methods: {
    // temporary method to join a room
    async joinRoom(roomId) {
      // TODO: implement this later
      console.log("joinRoom: ", roomId);
    },
    async createRoom(roomName) {
      services.Rooms.createRoom(roomName);
    },
    async updateCurrentRoom(roomId) {
      this.$store.dispatch("setCurrentRoom", roomId);
      await this.$store.dispatch("fetchRoomMessages", roomId);
    },
    getInitials(fullName) {
      let names = fullName.split(" ");
      let initials = "";
      names.forEach(name => (initials += name.substring(0, 1)));
      return initials;
    }
  },
};
</script>
