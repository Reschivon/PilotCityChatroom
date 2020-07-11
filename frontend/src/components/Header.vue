<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark class="header primary">
    <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon> -->
    <v-img
      alt="PilotCity Logo"
      class="shrink mr-2"
      contain
      src="@/assets/pc_logo.svg"
      transition="scale-transition"
      width="30"
    />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-2">
      <span class="hidden-sm-and-down">PilotCity</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <span class="chat-title">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => {
    return {
      title: "# Coding Interns"
    };
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    }
  }
};
</script>