<template>
    <div
        class="mr-8 d-flex align-center justify-space-between"
        v-if="isUserLogged"
    >
        <v-avatar color="accent" size="36">{{ userInitials }}</v-avatar>
        <span class="ml-3 text-subtitle-1">{{ username }}</span>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="white" plain v-bind="attrs" v-on="on">
                    <v-icon>mdi-menu-down</v-icon>
                </v-btn>
            </template>
            <v-list>
                <!-- <v-list-item link :to="{ name: 'UserInfo' }">
                    <v-list-item-icon
                        ><v-icon
                            >mdi-account-details-outline</v-icon
                        ></v-list-item-icon
                    >
                    <v-list-item-title>User Info</v-list-item-title>
                </v-list-item> -->
                <v-list-item link @click="logout">
                    <v-list-item-icon
                        ><v-icon>mdi-logout</v-icon></v-list-item-icon
                    >
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
    <div v-else-if="!isInLoginView">
        <v-btn color="green darken-2" :to="{ name: 'Login' }">
            <span>Fazer Login</span>
        </v-btn>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { getModule } from "vuex-module-decorators";
import UserModule from "@/store/modules/UserModule";

@Component
export default class LoginIndicator extends Vue {
    store = getModule(UserModule, this.$store);

    logout(): void {
        this.store.setUser(null);
        this.store.setCart([]);
    }

    get userInitials(): string | undefined {
        // If the name contains more than one word we get the initials of the names
        if (this.username) {
            if (this.username.includes(" ")) {
                let names = this.username.split(" ");
                return names[0].charAt(0) + names[1].charAt(0);
            } else {
                // Else we get the 2 letters of the name
                return this.username.slice(0, 2);
            }
        }
    }

    get username(): string | null | undefined {
        return this.store.user?.name;
    }

    get isUserLogged(): boolean {
        return this.store.user !== null;
    }

    get isInLoginView(): boolean {
        return this.$route.name === "Login" || this.$route.name === "Register";
    }
}
</script>