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
                <p class="setting-subheader">Username</p>
                <p class="setting-information">{{ user.username }}</p>
                <p class="setting-subheader">Email</p>
                <p class="setting-information">{{ user.email }}</p>
                <p class="setting-subheader">Password</p>
                <div class="font-Raleway"><!-- font doesn't work for some reason-->
                    <v-btn large class="font-family-Raleway">
                        <span>Reset Password</span>
                        <v-icon right>mdi-send</v-icon>
                    </v-btn>
                </div>
            </v-card> 
        </v-container>
    </v-row>
  </v-container>

</template>

<script>
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
        }
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