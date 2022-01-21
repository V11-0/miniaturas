<template>
    <div v-if="miniature">
        <h2 class="text-h2">{{ miniature.model }}</h2>

        <v-row class="mt-6">
            <v-col cols="4">
                <v-card rounded>
                    <v-img :lazy-src="miniature.image" height="150" />

                    <v-card-subtitle class="text-h3">{{
                        miniature.brand
                    }}</v-card-subtitle>
                    <v-card-text class="text-h4 font-weight-light"
                        >R$ {{ miniature.price }}</v-card-text
                    >
                </v-card>

                <h5 class="text-h5 text--secondary mt-16">
                    Adicionar ao carrinho
                </h5>

                <div class="d-flex justify-space-around align-center mt-4">
                    <v-btn text icon x-large @click="addCartCount--">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="text-h3">{{ addCartCount }}</span>
                    <v-btn text icon x-large @click="addCartCount++">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div>

                <div class="d-flex justify-space-between align-center mt-16">
                    <h2 class="text-h2">
                        R$ {{ miniature.price * addCartCount }}
                    </h2>

                    <v-btn color="primary" large @click="addToCart">
                        <v-icon left>mdi-cart-variant</v-icon>
                        Adiconar
                    </v-btn>
                </div>
            </v-col>
            <v-col cols="8">
                <div v-for="(value, name, index) in miniature" :key="name">
                    <v-list-item two-line>
                        <v-list-item-title class="text--secondary">
                            {{ formattedAttrNames[index] }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text--primary text-h6">
                            {{ value }}
                        </v-list-item-subtitle>
                    </v-list-item>

                    <v-divider />
                </div>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        <v-progress-circular
            class="mt-2 align-center"
            color="primary"
            size="50"
            indeterminate
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { Miniature } from "@/models/Miniature";

import MiniaturesRepository from "@/repositories/MiniaturesRepository";

import UserModule from "@/store/modules/UserModule";

@Component
export default class MiniatureView extends Vue {
    @Prop({ required: true })
    miniatureId!: number;

    miniature: Miniature | null = null;

    addCartCount = 1;

    userModule = getModule(UserModule, this.$store);

    async created(): Promise<void> {
        this.miniature = await this.fetchMiniature();
    }

    async fetchMiniature(): Promise<Miniature> {
        return await MiniaturesRepository.getMiniature(this.miniatureId);
    }

    addToCart(): void {
        this.userModule.addToCart({ product: this.miniature!, quantity: this.addCartCount });
        this.$router.push({ name: 'Cart' })
    }

    get formattedAttrNames(): Array<string> {
        return [
            'Número de identificação',
            'Marca',
            'Modelo',
            'Ano',
            'Cor',
            'Aceleração',
            'Potência',
            'Torque',
            'Velocidade Máxima',
            'Consumo',
            'Assentos',
            'Peso',
            'Preço',
            'Local da Imagem'
        ];
    }
}
</script>