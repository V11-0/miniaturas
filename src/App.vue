<template>
  <v-app>
    <BaseAppBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import BaseAppBar from '@/components/base/BaseAppBar.vue';

@Component({
  components: {
    BaseAppBar,
  },
})
export default class App extends Vue {}
</script>
