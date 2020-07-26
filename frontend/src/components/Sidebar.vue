<template>
  <!-- Took out v-model="showDrawer" from v-navigation-drawer -->
  <!-- Hiding the drawer with a button is not needed -->

  <v-navigation-drawer app class="primary" dark :clipped="$vuetify.breakpoint.lgAndUp">
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

      <!-- Settings -->
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Stakeholders -->
      <v-list-group v-model="stakeholders.model">
        <v-icon color="white" slot="prependIcon">mdi-account-tie</v-icon>
        <v-icon color="white" slot="appendIcon">mdi-chevron-down</v-icon>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="white--text">Stakeholders</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(child, i) in stakeholders.children"
          :key="i"
          link
          :value="value"
          @click="updateTitle"
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

      <v-subheader>Recent chats</v-subheader>

      <template v-for="chat in recentChats" :keys="chat.name" :router-to="chat.route">
        <v-list-item :key="chat.text" link :value="value" @click="updateTitle">
          <v-list-item-avatar :color="chat.individual ? colors.green : null">
            <span
              v-if="chat.individual"
              style="width: 100%; align-items: center"
            >{{ getInitials(chat.name)}}</span>
            <v-icon v-else>{{ chat.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ chat.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-subheader>Older chats</v-subheader>

      <template v-for="chat in olderChats" :keys="chat.name" :router-to="chat.route">
        <v-list-item :key="chat.name" link :value="value" @click="updateTitle">
          <v-list-item-avatar :color="chat.individual ? colors.green : null">
            <span
              v-if="chat.individual"
              style="width: 100%; align-items: center"
            >{{ getInitials(chat.name)}}</span>
            <v-icon v-else>{{ chat.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ chat.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import * as dataService from "../services/data";

export default {
  name: "Sidebar",
  props: ["value"],
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
      },
      recentChats: [],
      olderChats: [],
    }
  },
  methods: {
    updateTitle(event) {
      this.$emit("input", event.srcElement.outerText);
    },
    setData() {
      // for now just going to add everying to recent chats 
      this.recentChats = dataService.data.rooms.map(room => {
        return {
          icon: "mdi-account-group",
          name: room.name,
        }
      });
    },
    getInitials(fullName) {
      let names = fullName.split(" ");
      let initials = "";
      names.forEach(name => (initials += name.substring(0, 1)));
      return initials;
    },
  },
  async created() {
    await dataService.fetchRooms();
    this.setData();
  },
};
</script>