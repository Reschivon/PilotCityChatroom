<template>
    <div>
        <v-btn color="white mb-6" icon @click="isClicked = true"> 
            <v-icon> mdi-pencil</v-icon>
        </v-btn>


        <v-dialog max-width="600px"
        v-model="isClicked"
        >
        <v-card>
            <v-card-title class="headline">Edit Username</v-card-title>

            <v-card-text>
                <v-form>
                    <v-text-field label="New Username" v-model="Username">
                   </v-text-field>
                   <v-btn color="success" @click="saveData(Username)">
                       <span>Save</span>
                    </v-btn>
                </v-form>
            <!-- {{SettingsContent.user.email}} fix this to be dynamic later-->
            </v-card-text>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
//import SettingsContent from "./SettingsContent"
export default {
    name: "PopupEditData",
    data(){
        return{
            isClicked: false,
            Username: "",
        }
    },
    methods:{
        saveData(Username){
            console.log("Your new username is " + Username)
            this.$emit("updatedUsername", Username)
        }
    },

    components:{
       // SettingsContent
    }
}
</script>