<template>
    <div>
        <h2 class="text-h2 my-8">Fazer Login</h2>

        <v-form ref="loginForm" lazy-validation>
            <v-text-field
                v-model="cpf"
                v-mask="'###.###.###-##'"
                label="CPF"
                type="text"
                required
            />

            <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                @input="checkPassword"
                required
            />

            <v-btn color="success" class="mt-2 mb-6" @click="login">Entrar</v-btn>
        </v-form>

        <div class="mt-16 mb-4 text--secondary">Não possui conta?</div>
        <v-btn outlined color="primary" :to="{ name: 'Register' }">Crie Uma!</v-btn>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Login extends Vue {
    // Models
    cpf: string = '';
    password: string = '';

    login(): void {
        console.log("Pimba");
    }
}
</script>