<template>
    <v-app>
        <BaseAppBar />

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>

        <BaseNavigation />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import BaseAppBar from '@/components/base/BaseAppBar.vue';
import BaseNavigation from '@/components/base/BaseNavigation.vue';

@Component({
    components: {
        BaseAppBar,
        BaseNavigation
    },
})
export default class App extends Vue {
}
</script>
