<template>
    <div>
        
        <v-btn large class="font-family-Raleway" @click="isClicked = true">
            <span>Reset Password</span>
            <v-icon right>mdi-send</v-icon> 
        </v-btn>

        <v-dialog max-width="600px"
        v-model="isClicked"
        >
        <v-card>
            <v-card-title class="headline">Reset Password Sent</v-card-title>

            <v-card-text>
            {{`An email has been sent to ${email} to reset your password.`}}
            </v-card-text>
        </v-card>
        </v-dialog>
    </div>
</template>

<script> 
//import SettingsContent from "./SettingsContent"
export default {
    name: "Popup",
    props:{
        input:String,
        email:String
    },
    data(){
        return{
            isClicked: false,
        }
    },
    methods:{
        tellClicked(){
            console.log("clicked")
        }
    },

    components:{
       // SettingsContent
    }
}
</script>