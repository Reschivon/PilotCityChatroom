<template>
  <v-container class="my-5">
    <!--Profile Picture-->
    <v-row align="center" justify="center">
      <v-img
        class="mr-2"
        contain
        src="@/assets/pfp.png"
        transition="scale-transition"
        max-width="300"
      />
    </v-row>
    <!--Settings-->
    <v-row align="center" justify="center">
      <h1 class="text-decoration-underline big-letters white--text">Meeting Settings</h1>
    </v-row>
    <!--General Settings Information-->
    <v-row align="center" justify="center">
      <v-container class="white-border">
        <v-card class="pa-6 accent" width="100%" outlined>
          <v-row>
            <p class="setting-subheader ml-3">Chat Name</p>
            <v-col cols="14">
              <!-- if you want more values from 1 v model pass an array from child -->
              <EditData v-model="chat.name" :title="`Chat Name`"/>
            </v-col>
          </v-row>
          <p class="setting-information">{{ chat.name }}</p>
          <v-row>
            <p class="setting-subheader ml-3">Members</p>
            <v-col cols="14">
              <EditData v-model="chat.name" :title="`Members`"/>
            </v-col>
          </v-row>
          <p class="setting-information">{{ chat.name }}</p>
          <p class="setting-subheader">Password</p>
              <!-- #todo -->
            <ResetPasswordPopup :email="chat.name"/>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Popup from "@/components/meetingSettingsComponents/LeaveMeetingPopup";
import PopupEditData from "@/components/generalSettingsComponents/PopupEditData";
export default {
  //{{ data.myPfp }}
  name: "SettingsContent",
  data() {
    return {
      chat: {
        name: "Coding Interns",
        members:[
          {name: "Baby", lastName: "Joe", id: "123", pfp: "@/assets/pfp.png"},
          {name: "Joe", lastName: "Mama", id: "345", pfp: "@/assets/pfp.png"},
          {name: "Joe", lastName: "Papa", id: "567", pfp: "@/assets/pfp.png"},
        ],
      },
    };
  },
  methods: {
    getImgUrl() {
      /*this method doesn't work, trying to make show picture dynamically
            console.log("picture required by code")
            return require("@/assets/pfp.png")
*/
    },
    emitData(data){
        console.log("clicked me");
        this.$emit("input", data)
    }
  },

  components: {
    ResetPasswordPopup: Popup,
    EditData: PopupEditData
  }
};
</script>

<style>
.big-letters {
  font-size: 3.5em;
}

.setting-subheader {
  text-decoration: underline;
  color: white;
  font-size: 2em;
}

.setting-information {
  color: white;
  font-size: 1.5em;
}

.white-border {
  border-style: solid;
  border-color: white;
  border-radius: 10px;
}

.font-Raleway {
  font-family: Raleway;
}
</style>