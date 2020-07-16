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
          <v-form>
            <v-text-field :label="`New ${title}`" v-model="dataChange"></v-text-field>
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
  name: "PopupEditData",
  props: {
    value: String,
    title: String
  }, // ready to receive "male prop"
  data() {
    return {
      isClicked: false,
      dataChange: this.value
    };
  },
  methods: {
    emitData(dataChange) {
      this.$emit("input", dataChange);
    }
  },
  components: {
    // SettingsContent
  }
};
</script>