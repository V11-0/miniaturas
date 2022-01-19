<template>
    <v-app-bar app color="light-blue darken-4">
        <v-icon x-large :to="{ name: 'Home' }">mdi-car-sports</v-icon>
        <v-toolbar-title class="ml-3 text-h5">Miniaturas</v-toolbar-title>

        <v-spacer></v-spacer>

        <LoginIndicator />
    </v-app-bar>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import LoginIndicator from '@/components/LoginIndicator.vue';

@Component({
    components: {
        LoginIndicator
    }
})
export default class BaseAppBar extends Vue {
}
</script>