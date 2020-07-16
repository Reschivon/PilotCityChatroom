
<template>
  <!-- Took out v-model="showDrawer" from v-navigation-drawer -->
  <!-- Hiding the drawer with a button is not needed -->

  <v-navigation-drawer app class="primary" :clipped="$vuetify.breakpoint.lgAndUp" dark>
    <v-list dense>
      <template>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Find a conversation"
        ></v-text-field>
      </template>
      <template v-for="item in items" :keys="item.text" router :to="item.route">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(child, i) in item.children" :key="i" link>
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" link>
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
  // props: {
  //   drawer: Boolean
  // },
  data: () => {
    return {
      // showDrawer: null,
      items: [
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-message",
          text: "Favorites",
          model: false,
          children: [
            { icon: "mdi-account", text: "Lin" },
            { icon: "mdi-account", text: "Jeffery" },
            { icon: "mdi-account", text: "Joe" },
            { icon: "mdi-account", text: "Aditya" },
            { icon: "mdi-account", text: "Aang" }
          ]
        },
        {
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-help-circle",
          text: "Stakeholders",
          model: false,
          children: [
            {icon: "mdi-account", text: "A-heel" },
            {icon: "mdi-account", text: "Prajet" },
            {icon: "mdi-account", text: "Dayrick" },
            {icon: "mdi-account", text: "Keknee" },
            {icon: "mdi-account", text: "Pokemonaca" }
          ] 
        },
        { icon: "mdi-cellphone-link", text: "Settings", route: '/settings/user'},
        { icon: "mdi-blank", text: ""},
        { icon: "mdi-account", text: "Person 2" },
        { icon: "mdi-contacts", text: "Group 1" },
        { icon: "mdi-account", text: "Person 4" },
        { icon: "mdi-account", text: "Person 5" },
        { icon: "mdi-contacts", text: "Group 2" },
        { icon: "mdi-contacts", text: "Group 3" },
        { icon: "mdi-contacts", text: "Group 4" },
        { icon: "mdi-account", text: "Person 6" },
        { icon: "mdi-contacts", text: "Group 5" },
        { icon: "mdi-contacts", text: "Group 6" },
        { icon: "mdi-account", text: "Person 7" }
      ]
    };
  }
  // methods: {
  //   toggleDrawer() {
  //     console.log("Drawer prop: ", this.drawer);
  //     this.showDrawer = this.drawer;
  //   }
  // },
};
</script>