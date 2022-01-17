<template>
    <v-app-bar app color="primary">
        <v-icon x-large>mdi-car-sports</v-icon>
        <v-toolbar-title class="ml-2">Miniaturas</v-toolbar-title>

        <v-spacer></v-spacer>

        <div>
            <v-avatar color="accent" size="32">{{ userInitials }}</v-avatar>
            <span class="ml-2">{{ username }}</span>

            <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="white" v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-icon class="mr-2">mdi-logout</v-icon>
                            <span>Logout</span>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
    </v-app-bar>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class BaseAppBar extends Vue {

    username: string = "A name"

    get userInitials(): string {

        // If the name contains more than one word we get the initials of the names
        if (this.username.includes(" ")) {
            let names = this.username.split(" ");
            return names[0].charAt(0) + names[1].charAt(0);
        } else { // Else we get the 2 letters of the name
            return this.username.slice(0, 2);
        }
    }
}
</script>