<template>
    <v-bottom-navigation grow shift>
        <v-btn :to="{ name: 'Products' }">
            <span>Produtos</span>
            <v-icon>mdi-store-search</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'Cart' }">
            <span>Carrinho</span>
            <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class BaseNavigation extends Vue {
}
</script>