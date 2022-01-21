<template>
    <div>
        <h2 class="text-h2 my-8">Fazer Login</h2>

        <v-form ref="loginForm" lazy-validation>
            <v-text-field
                v-model="cpf"
                v-mask="'###.###.###-##'"
                label="CPF"
                type="text"
                :rules="cpfRules"
                required
            />

            <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                :rules="passwordRules"
                required
            />

            <v-btn
                color="green darken-2"
                class="mt-4 mb-6"
                @click="login"
                :loading="loading"
                >Entrar</v-btn
            >
        </v-form>

        <v-alert type="error" text v-model="alertEnabled">
            {{ alertMessage }}
        </v-alert>

        <div class="mt-16 mb-4 text--secondary">Não possui conta?</div>
        <v-btn outlined color="primary" :to="{ name: 'Register' }"
            >Crie Uma!</v-btn
        >
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { getModule } from "vuex-module-decorators";

import UserRepository from "@/repositories/UserRepository";

import UserModule from "@/store/modules/UserModule";
import { sha512 } from "js-sha512";

@Component
export default class Login extends Vue {

    userStore = getModule(UserModule, this.$store);

    // Models
    cpf: string = "";
    password: string = "";

    // Form Input Rules
    cpfRules = [(cpf: string) => cpf.length === 14 || "Digite um CPF válido"];

    passwordRules = [(pass: string) => !!pass || "Digite a senha"];

    // UI
    loading = false;

    alertEnabled = false;
    alertMessage = '';

    async login(): Promise<void> {

        if (this.formReference.validate()) {

            this.loading = true;

            try {

                const user = await UserRepository.login(this.cpf, sha512(this.password));
                this.userStore.setUser(user);

                this.userStore.setCart([]);

                const cartData: any = await UserRepository.getCart(user.id!);

                if (cartData) {
                    this.userStore.setCart(cartData.cartItems);
                }

                this.$router.push({ name: 'Products'});
            } catch (e) {
                this.loading = false;

                this.alertEnabled = true;
                this.alertMessage = "Usuário ou senha incorretos.";
            }
        }
    }

    // Cast the form reference to proper form object
    get formReference() {
        return this.$refs.loginForm as Vue & { validate: () => boolean }
    }
}
</script>