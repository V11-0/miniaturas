<template>
    <div class="mr-8 d-flex align-center justify-space-between" v-if="isUserLogged">
        <v-avatar color="accent" size="36">{{ userInitials }}</v-avatar>
        <span class="ml-3 text-subtitle-1">{{ username }}</span>
    </div>
    <div v-else-if="!isInLoginView">
        <v-btn color="primary" :to="{ name: 'Login' }">
            <span>Fazer Login</span>
        </v-btn>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import { getModule } from 'vuex-module-decorators';
import UserModule from '@/store/modules/UserModule';

@Component
export default class LoginIndicator extends Vue {

    store = getModule(UserModule, this.$store);

    get userInitials(): string | undefined {

        // If the name contains more than one word we get the initials of the names
        if (this.username) {
            if (this.username.includes(" ")) {
            let names = this.username.split(" ");
            return names[0].charAt(0) + names[1].charAt(0);
        } else { // Else we get the 2 letters of the name
            return this.username.slice(0, 2);
        }
        }
    }

    get username(): string | null {
        return this.store.username;
    }

    get isUserLogged(): boolean {
        return this.username !== null;
    }

    get isInLoginView(): boolean {
        return this.$route.name === 'Login' || this.$route.name === 'Register';
    }
}
</script>