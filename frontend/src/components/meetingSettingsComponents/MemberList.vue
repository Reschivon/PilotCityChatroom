<template>
  <div>
    <v-btn color="white mb-6" icon @click="isClicked = true">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-dialog max-width="600px" v-model="isClicked">
      <v-card>
        <!-- `` means interpret as string unless esc ${{}} -->
        <!-- => means nested unanmed function aka callback -->
        <!-- escape button -->

        <v-row>
          <v-col>
            <v-card-title class="headline ml-2">{{`Edit ${title}`}}</v-card-title>
          </v-col>
          <v-btn class="mt-5 mr-7" color="primary" icon @click="isClicked = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>

        <!-- acutla member data -->

        <v-card-text>
          <!-- add members search bar -->
          <v-text-field
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            v-model="searchedMember"
            label="Add Members"
          ></v-text-field>
          <!-- @value="delimitByComma(searchedMember)" -->
          <div v-for="member in memberData" :key="member.id">
            <v-container v-if="member.name == searchedMember && !member.isMember">
              <!-- member.name == searchedMember               -->
              <v-row no-gutters>
                <v-col>
                  <v-card>
                    <v-row>
                      <v-col cols="3">
                        <v-img
                          class="mr-2 ml-3"
                          contain
                          src="@/assets/pfp.png"
                          transition="scale-transition"
                          max-width="75"
                        />
                      </v-col>
                      <v-col>
                        <p class="mt-6 member-text">{{`${member.name} ${member.lastName}`}}</p>
                        <p>{{input}}</p>
                      </v-col>
                      <v-col cols="2">
                        <v-checkbox v-model="member.isMember"></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <!-- display true members -->
          <div v-for="member in memberData" :key="member.id+1">
            <!--avoids duplicate keys-->
            <v-container v-if="member.isMember">
              <v-row no-gutters>
                <v-col>
                  <v-card>
                    <v-row>
                      <v-col cols="3">
                        <v-img
                          class="mr-2 ml-3"
                          contain
                          src="@/assets/pfp.png"
                          transition="scale-transition"
                          max-width="75"
                        />
                      </v-col>
                      <v-col>
                        <p class="mt-6 member-text">{{`${member.name} ${member.lastName}`}}</p>
                      </v-col>
                      <v-col cols="2">
                        <v-checkbox v-model="member.isMember"></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <!-- <v-text-field :label="`New ${title}`" v-model="dataChange"></v-text-field> -->
          <!-- took out button because it auto saves now <v-btn color="success" @click="emitData(dataChange); save">
            <span>Save</span>            
          </v-btn>-->

          <!-- {{SettingsContent.user.email}} fix this to be dynamic later-->
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template> 

<script>
//import SettingsContent from "./SettingsContent"
export default {
  name: "MembersList",
  props: {
    value: String,
    memberData: Array,
    title: String
  }, // ready to receive "male prop"
  data() {
    return {
      searchedMember: this.value,
      isClicked: false,
      isClicedSave: false,
      dataChange: this.value
      // delimitedSearchedMember: "",
    };
  },
  methods: {
    emitData(dataChange) {
      this.$emit("input", dataChange);
    },
    // delmitByComma(stringInput){
    //   this.delimitedSearchedMember = stringInput.split(",")
    // },
    isMember(memberName) {
      console.log("this sent ismember");
      if (memberName == this.searchedMember) {
        return true;
      } else {
        return false;
      }
    },
    updateSearchMember(payload) {
      this.searchedMember = payload;
    }
  },
  components: {}
};
</script>

<style>
.member-text {
  font-size: 1.5em;
  font-family: Raleway;
  color: #373737;
}

.flexible-start-right {
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
}
</style>