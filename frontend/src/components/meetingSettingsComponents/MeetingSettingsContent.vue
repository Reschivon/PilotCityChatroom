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
      <h1 justify-center class="text-decoration-underline big-letters white--text">Meeting Settings</h1>
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
              <MemberList @updatedMemberData="chat.members = $emit" :memberData="chat.members" :title="'Members'"/>
            </v-col>
          </v-row>
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
import MemberList from "@/components/meetingSettingsComponents/MemberList";
import * as services from "../../services"

export default {
  name: "SettingsContent",
  data() {
    return {
      chat: {
        titleVariable: 'members222',
        name: "Coding Interns",
        members:[
          {name: "Baby", lastName: "Joe", id: "123", pfp: "@/assets/pfp.png", isMember: true},
          {name: "Joe", lastName: "Mama", id: "345", pfp: "@/assets/pfp.png", isMember: false},
          {name: "Joe", lastName: "Papa", id: "567", pfp: "@/assets/pfp.png", isMember: true},
          {name: "Joe", lastName: "Guy", id: "432", pfp: "@/assets/pfp.png", isMember: true},
          {name: "Joe", lastName: "Grandma", id: "332", pfp: "@/assets/pfp.png", isMember: false},
        ],
        // currentUser: this.chat.members[0],
      },
    };
  },
  methods: {
    fetchUsers() {
      services.userService
        .find({})
        .then(users => {
          console.log("users", users);
          this.members = users.data;
        })
        .catch(e => {
          console.log("meetingSettingsService error: ", e);
        });
    },
    emitData(data){
        console.log("clicked me");
        this.$emit("input", data)
    }
  },

  components: {
    ResetPasswordPopup: Popup,
    EditData: PopupEditData,
    MemberList
  }
};
</script>

<style>
.big-letters {
  font-size: 3.4em;
  max-width: font;
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