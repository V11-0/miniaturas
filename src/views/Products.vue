<template>
    <h2>Products View</h2>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import { Miniature } from '@/models/Miniature';

import MiniaturesRepository from '@/repositories/MiniaturesRepository';

@Component
export default class Products extends Vue {

    products: Array<Miniature> = [];

    async created(): Promise<void> {
        await this.fetchProducts();
    }

    async fetchProducts() {
        this.products = await MiniaturesRepository.getMiniatures();
    }
}
</script>