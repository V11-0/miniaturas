<template>
    <div>
        <v-alert v-if="!logged" type="info" text>
            Você não está logado, os produtos no seu carrinho não serão salvos
        </v-alert>

        <div v-if="haveProducts">
            <v-card v-for="minCart in cart" :key="minCart.product.id" class="d-flex justify-space-around">
                <v-img :lazy-src="minCart.product.image" height="50px" width="50px" />

                <span>{{ minCart.product.model }}</span>

                <span>{{ minCart.quantity }}</span>
            </v-card>
        </div>

        <div v-else>
            <h5 class="text-h5">Sem produtos no carrinho</h5>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';

import UserModule from '@/store/modules/UserModule';
import { MiniatureCart } from '@/models/MiniatureCart';

@Component
export default class Cart extends Vue {

    store = getModule(UserModule, this.$store);

    get logged(): boolean {
        return this.store.user !== null;
    }

    get haveProducts(): boolean {
        return this.store.cart.length > 0;
    }

    get cart(): Array<MiniatureCart> {
        return this.store.cart;
    }
}
</script>