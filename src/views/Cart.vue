<template>
    <div>
        <v-alert v-if="!logged" type="info" text>
            Você não está logado, os produtos no seu carrinho não serão salvos
        </v-alert>

        <div v-if="haveProducts">
            <v-card class="rounded">
                <div
                    v-for="minCart in cart"
                    :key="minCart.miniature.id"
                    class="py-4 px-16"
                >
                    <v-row class="align-center">
                        <v-col>
                            <v-img
                                :src="minCart.miniature.image"
                                max-height="150"
                                max-width="250"
                            />
                        </v-col>
                        <v-col>
                            <span>{{ minCart.miniature.model }}</span>
                        </v-col>
                        <v-col>
                            <div
                                class="
                                    d-flex
                                    justify-space-between
                                    align-center
                                "
                            >
                                <v-btn
                                    text
                                    icon
                                    large
                                    @click="minCart.quantity--"
                                >
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <span class="text-h6 mx-1">{{
                                    minCart.quantity
                                }}</span>
                                <v-btn
                                    text
                                    icon
                                    large
                                    @click="minCart.quantity++"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col>
                            <span class="text-h5"
                                >R$
                                {{
                                    minCart.miniature.price * minCart.quantity
                                }}</span
                            >
                        </v-col>
                    </v-row>
                </div>
            </v-card>

            <div class="mt-8 d-flex justify-end align-center">
                <div class="mr-8">
                    <span class="text-h6">Total: </span>
                    <span class="text-h5">R$ {{ totalValue }}</span>
                </div>

                <v-btn color="accent" :loading="finishingOrder" @click="finishOrder">
                    <v-icon class="mr-4">mdi-cart-outline</v-icon>
                    Finalizar Compra
                </v-btn>
            </div>
        </div>

        <div v-else>
            <h5 class="text-h5">Sem produtos no carrinho</h5>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from "vuex-module-decorators";

import UserModule from "@/store/modules/UserModule";
import { MiniatureCart } from "@/models/MiniatureCart";

@Component
export default class Cart extends Vue {
    store = getModule(UserModule, this.$store);

    finishingOrder = false;

    finishOrder(): void {
        this.finishingOrder = true;

        setTimeout(() => {
            this.store.setCart([]);
            this.$router.push({ name: 'OrderFinished' });
        }, 1500);
    }

    get logged(): boolean {
        return this.store.user !== null;
    }

    get haveProducts(): boolean {
        return this.store.cart.length > 0;
    }

    get cart(): Array<MiniatureCart> {
        return this.store.cart;
    }

    get totalValue(): number {
        let value = 0;

        this.cart.forEach(mCart => {
            value += mCart.miniature.price * mCart.quantity
        });

        return value;
    }
}
</script>