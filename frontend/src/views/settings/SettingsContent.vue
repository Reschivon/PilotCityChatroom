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
        <h1 class="text-decoration-underline big-letters white--text">Settings</h1>       
    </v-row>
    <!--General Settings Information-->
    <v-row align="center" justify="center">
        <v-container class="white-border">
            <v-card 
            class="pa-6 accent"
            width="100%"
            outlined>
            <v-row>
                <p class="setting-subheader ml-3">Username</p>
                    <v-col cols="14">
                        <EditUsername />
                    </v-col>
                </v-row>
                <p class="setting-information" v-on:updatedUsername="updateUsername($event)">{{ user.username }}</p>
                <v-row>
                    <p class="setting-subheader ml-3">Email</p>
                        <v-col cols="14">
                            <EditUsername />
                        </v-col>
                </v-row>
                <p class="setting-information">{{ user.email }}</p>
                <p class="setting-subheader">Password</p>
                <ResetPasswordPopup />
            </v-card> 
        </v-container>
    </v-row>
  </v-container>

</template>

<script>
import Popup from "./Popup"
import PopupEditData from "./PopupEditData"
export default { //{{ data.myPfp }}
    name: "SettingsContent",
    data() {
        return {
            user:{myPfp: "@/assets/pfp.png", username: "FlexibleMonsterPoop", email: "CodingInterns@pc.net"}
        }
    },
    methods: {
        getImgUrl(){/*this method doesn't work, trying to make show picture dynamically
            console.log("picture required by code")
            return require("@/assets/pfp.png")
*/
        
        },
        updateUsername(newUsername){
            this.user.username = newUsername
            console.log("new username updated")
        }
    },

    components: {
        ResetPasswordPopup: Popup,
        EditUsername: PopupEditData
    }
}
</script>

<style>
.big-letters{
    font-size:3.5em
}

.setting-subheader{
    text-decoration: underline;
    color: white;
    font-size: 2em
}

.setting-information{
    color: white;
    font-size: 1.5em;
}

.white-border{
    border-style:solid;
    border-color: white;
    border-radius: 10px;
}

.font-Raleway{
  font-family:Raleway;
}
</style>