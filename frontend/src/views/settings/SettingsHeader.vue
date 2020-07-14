<template>
  <div>
    <v-app-bar
      app
      dark
      class="header primary flex-grow-1 flex-shrink-1"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon> -->
      <v-img
        alt="PilotCity Logo"
        class="shrink"
        contain
        src="@/assets/pc_logo.svg"
        transition="scale-transition"
        width="30"
      />
      <v-toolbar-title class="ml-5">
        <span class="hidden-sm-and-down">PilotCity</span>
      </v-toolbar-title>
      <v-toolbar-title class="flex-grow-1 flex-shrink-1 d-flex justify-center" color="red">
        <span class="chat-title">{{ title }}</span>
      </v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar app class="hidden-md-and-up header primary flex-grow-1 flex-shrink-1" dark flat>
      <v-img
        alt="PilotCity Logo"
        class="shrink hidden-lg-and-up"
        contain
        src="@/assets/pc_logo.svg"
        transition="scale-transition"
        width="30"
      />
      <v-toolbar-title class="flex-grow-1 flex-shrink-1 d-flex justify-center" color="red">
        <span class="chat-title">{{ title }}</span>
      </v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => {
    return {
      title: "Settings"
    };
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    }
  }
};
</script>