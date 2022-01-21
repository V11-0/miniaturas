<template>
    <div>

        <h4 class="text-h4 my-4">
            Produtos <span class="green--text text--accent-4">em estoque</span>
        </h4>

        <v-row>
            <v-col v-for="product in products" :key="product.id" cols="6">
                <v-card class="my-4 mx-1" :to="`/miniature/${product.id}`">
                    <v-img
                        :src="product.image"
                        class="align-end"
                        height="125"
                        gradient="to bottom left, #00000000, #000000ff"
                    >
                        <v-card-title
                            >{{ product.brand }}
                            {{ product.model }}</v-card-title
                        >
                    </v-img>

                    <v-card-subtitle
                        class="text--primary text-h5 font-weight-light"
                        >R$ {{ product.price }}</v-card-subtitle
                    >

                    <v-card-actions>
                        <v-btn
                            icon
                            color="accent"
                            x-large
                            @click.prevent="openCartSheet(product)"
                        >
                            <v-icon>mdi-cart-plus</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-bottom-sheet v-model="bottomSheetModel" inset>
            <v-sheet
                v-if="bottomSheetModel"
                class="
                    text-center
                    d-flex
                    flex-column
                    justify-space-around
                    align-center
                "
                height="300px"
            >
                <v-btn color="primary" @click="addToCart">
                    <v-icon left>mdi-cart-variant</v-icon>
                    Adiconar
                </v-btn>

                <div class="d-flex justify-space-between align-center">
                    <div>
                        <span class="text-h5"
                            >{{ selectedProduct.brand }}
                            {{ selectedProduct.model }}</span
                        >
                        <span class="text-h6 ml-8 font-weight-light"
                            >R$ {{ selectedProduct.price }}</span
                        >
                    </div>
                </div>

                <div class="d-flex justify-space-between align-center">
                    <v-btn text icon large @click="addCartCount--">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="text-h6 mx-1">{{ addCartCount }}</span>
                    <v-btn text icon large @click="addCartCount++">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div>

                <span class="text-h2"
                    >R$ {{ selectedProduct.price * addCartCount }}</span
                >
            </v-sheet>
        </v-bottom-sheet>

        <v-snackbar v-model="showAddedCartAlert" timeout="3000" app color="green darken-4">
            Adicionado ao carrinho
        </v-snackbar>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { Miniature } from "@/models/Miniature";

import UserModule from "@/store/modules/UserModule";

import MiniaturesRepository from "@/repositories/MiniaturesRepository";
import UserRepository from "@/repositories/UserRepository";

@Component
export default class Products extends Vue {
    products: Array<Miniature> = [];

    bottomSheetModel = false;
    selectedProduct: Miniature | null = null;

    addCartCount = 1;

    userModule = getModule(UserModule, this.$store);

    showAddedCartAlert = false;

    async created(): Promise<void> {
        await this.fetchProducts();
    }

    async fetchProducts() {
        this.products = await MiniaturesRepository.getMiniatures();
    }

    openCartSheet(product: Miniature) {
        this.selectedProduct = product;
        this.bottomSheetModel = true;
    }

    @Watch('addCartCount')
    onAddCartValueChange(newVal: number) {

        if (newVal < 1) {
            this.addCartCount = 1;
        }
    }

    async addToCart(): Promise<void> {

        if (this.userModule.user !== null) {
            let userId = this.userModule.user.id;

            await UserRepository.addToCart(userId!, { miniatureId: this.selectedProduct?.id!, quantity: this.addCartCount });
        }

        this.userModule.addToCart({ miniature: this.selectedProduct!, quantity: this.addCartCount });
        this.bottomSheetModel = false;
        this.showAddedCartAlert = true;
    }
}
</script>