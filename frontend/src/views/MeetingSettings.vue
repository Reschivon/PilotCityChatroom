<template>
<div class="secondary fill-background font-Raleway">
  <v-container class="">
    <v-container class="">
      <Header/>
    </v-container>
    <v-container class="my-5">
        <SettingsContent/>
    </v-container>
  </v-container>
</div>
</template>


<script>
import Header from "@/components/meetingSettingsComponents/SettingsHeader";
import SettingsContent from "@/components/meetingSettingsComponents/SettingsContent";
export default {
  name: "MeetingSettings",
  components: {
    Header,
    SettingsContent,
  },
  data () {
    return {
     
    }
  },
}
</script>

<style>
.fill-background{
  height:100%;
  width:100%
}

.font-Raleway{
  font-family:Raleway;
}
</style>
