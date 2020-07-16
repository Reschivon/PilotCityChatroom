<template>
  <div>
    <v-btn color="white mb-6" icon @click="isClicked = true">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-dialog max-width="600px" v-model="isClicked">
      <v-card>
        <!-- `` means interpret as string unless esc ${{}} -->
        <!-- => means nested unanmed function aka callback -->
        <v-card-title class="headline">{{`Edit ${title}`}}</v-card-title>

        <v-card-text>
          <!-- display members -->

          <v-form>
            <v-container v-for="member in memberData" :key="member.id">
              <v-row no-gutters v-if="member.isMember">
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
                        <v-checkbox
                          v-model="member.isMember"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <!-- <v-text-field :label="`New ${title}`" v-model="dataChange"></v-text-field> -->
            <v-btn color="success" @click="emitData(dataChange); isClicked=false">
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
  name: "MembersList",
  props: {
    memberData: Array,
    title: String
  }, // ready to receive "male prop"
  data() {
    return {
      isClicked: false,
      dataChange: this.value,
    };
  },
  methods: {
    emitData(dataChange) {
      this.$emit("input", dataChange);
    }
  },
  components: {}
};
</script>

<style scoped>
.member-text {
  font-size: 1.5em;
  font-family: Raleway;
  color: #373737;
}
</style>