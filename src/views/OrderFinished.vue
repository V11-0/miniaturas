<template>
    <div class="d-flex flex-column justify-center align-center mt-16">
        <v-icon x-large color="green">mdi-check-decagram-outline</v-icon>
        <span class="text-h6">Seu Pedido foi finalizado, Agradecemos a compra!</span>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class OrderFinished extends Vue {

}
</script>