<template>
    <div>
        <h2 class="text-h2 my-8">Criar Conta</h2>

        <v-form ref="registerForm" lazy-validation>

            <v-text-field v-model="name" label="Nome" type="text" required />

            <v-text-field v-model="email" label="Email" type="email" required />

            <v-text-field
                v-model="cpf"
                v-mask="'###.###.###-##'"
                label="CPF"
                type="text"
                required
            />

            <v-text-field
                v-model="cep"
                v-mask="'#####-###'"
                label="CEP"
                type="text"
                @input="completeAddress"
                required
            />

            <v-row>
                <v-col cols="8">
                    <v-text-field
                        v-model="address"
                        label="Endereço"
                        type="text"
                        disabled
                        required
                    />
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="number"
                        label="Número"
                        type="number"
                        required
                    />
                </v-col>
            </v-row>

            <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                @input="checkPassword"
                loading
                required
            >
                <template v-slot:progress>
                    <v-progress-linear
                        :value="passScore * 25"
                        :color="passProgressColor"
                        absolute
                        height="4"
                    ></v-progress-linear>
                </template>
            </v-text-field>

            <v-btn color="success" class="mt-2 mb-6" @click="register"
                >Entrar</v-btn
            >
        </v-form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Register extends Vue {
    // Models
    name: string = "";
    email: string = "";
    cpf: string = "";
    cep: string = "";
    address: string = "";
    number: number = 0;
    password: string = "";

    // Form Values
    passScore = 0;
    passProgressColor = "red";

    progressColors = ["red", "orange", "yellow", "lime", "green"];

    register(): void {
        console.log("Register");
    }

    completeAddress(): void {

        if (this.cep.length === 9) {
            // TODO: Reach ViaCEP Api to complete Address
        }
    }

    checkPassword(): void {
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        let contains_more_than_7_caracters;
        let contains_number;
        let contains_uppercase;
        let contains_special_character;

        if (this.password.length >= 7) {
            contains_more_than_7_caracters = true;
        } else contains_more_than_7_caracters = false;

        contains_number = /\d/.test(this.password);
        contains_uppercase = /[A-Z]/.test(this.password);
        contains_special_character = format.test(this.password);

        let conditions_array = [
            contains_more_than_7_caracters,
            contains_number,
            contains_uppercase,
            contains_special_character,
        ];

        this.passScore = 0;
        conditions_array.forEach((condition) => {
            if (condition) {
                this.passScore++;
            }
        });

        this.passProgressColor = this.progressColors[this.passScore];
    }
}
</script>