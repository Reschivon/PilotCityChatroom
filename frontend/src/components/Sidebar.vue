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
      <template v-for="(item, index) in items" :keys="item.text" router :to="item.route">
        <v-row v-if="item.divider" :key="index">
          <v-divider></v-divider>
        </v-row>
        <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" append-icon>
          <v-icon color="white" slot="prependIcon">{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
          <!-- The line below can be used if we want to append some type of icon (pin or close?) to the chat -->
          <!-- <v-icon color="white" slot="appendIcon">{{ item.model ? null : 'mdi-pin' }}</v-icon> -->
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            :value="value"
            @click="updateTitle"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" link :value="value" @click="updateTitle">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["value"],
  data: () => {
    return {
      // showDrawer: null,
      items: [
        // Implement favorites when all necessary features are done
        // {
        //   icon: "mdi-chevron-up",
        //   "icon-alt": "mdi-heart",
        //   text: "Favorites",
        //   model: false,
        //   children: [
        //     { icon: "mdi-account", text: "Lin" },
        //     { icon: "mdi-account", text: "Jeffery" },
        //     { icon: "mdi-account", text: "Joe" },
        //     { icon: "mdi-account", text: "Aditya" },
        //     { icon: "mdi-account", text: "Aang" }
        //   ]
        // },
        {
          icon: "mdi-cog",
          text: "Settings",
          route: "/settings/user"
        },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-account-tie",
          text: "Stakeholders",
          model: false,
          children: [
            { icon: "mdi-account", text: "A-heel" },
            { icon: "mdi-account", text: "Prajet" },
            { icon: "mdi-account", text: "Dayrick" },
            { icon: "mdi-account", text: "Keknee" },
            { icon: "mdi-account", text: "Pokemonaca" }
          ]
        },
        { divider: true },
        { icon: "mdi-account", text: "Person 2" },
        { icon: "mdi-account-group", text: "Group 1" },
        { icon: "mdi-account", text: "Person 4" },
        { icon: "mdi-account", text: "Person 5" },
        { icon: "mdi-account-group", text: "Group 2" },
        { icon: "mdi-account-group", text: "Group 3" },
        { icon: "mdi-account-group", text: "Group 4" },
        { icon: "mdi-account", text: "Person 6" },
        { icon: "mdi-account-group", text: "Group 5" },
        { icon: "mdi-account-group", text: "Group 6" },
        { icon: "mdi-account", text: "Person 7" }
      ]
    };
  },
  methods: {
    updateTitle(event) {
      this.$emit("input", event.srcElement.outerText);
    }
  }
};
</script>