<template>
    <div>
        <h2 class="text-h2 my-8">Criar Conta</h2>

        <v-form ref="registerForm" lazy-validation>
            <v-text-field
                v-model="name"
                label="Nome"
                type="text"
                :rules="generalRules"
                required
            />

            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
            />

            <v-text-field
                v-model="cpf"
                v-mask="'###.###.###-##'"
                label="CPF"
                type="text"
                :rules="cpfRules"
                required
            />

            <v-row>
                <v-col cols="4">
                    <v-text-field
                        v-model="cep"
                        v-mask="'#####-###'"
                        label="CEP"
                        type="text"
                        @input="completeAddress"
                        :rules="cepRules"
                        required
                    />
                </v-col>
                <v-col cols="8">
                    <v-text-field
                        v-model="address"
                        label="Endereço"
                        type="text"
                        disabled
                        required
                        :rules="generalRules"
                        loading="loadingAddress"
                    >
                        <template v-slot:progress>
                            <v-progress-linear
                                v-if="loadingAddress"
                                color="primary"
                                indeterminate
                                absolute
                                height="2"
                            ></v-progress-linear>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="3">
                    <v-text-field
                        v-model="city"
                        label="Cidade"
                        type="text"
                        disabled
                        required
                        :rules="generalRules"
                        loading="loadingAddress"
                    >
                        <template v-slot:progress>
                            <v-progress-linear
                                v-if="loadingAddress"
                                color="primary"
                                indeterminate
                                absolute
                                height="2"
                            ></v-progress-linear>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="uf"
                        label="UF"
                        type="text"
                        disabled
                        required
                        :rules="generalRules"
                        loading="loadingAddress"
                    >
                        <template v-slot:progress>
                            <v-progress-linear
                                v-if="loadingAddress"
                                color="primary"
                                indeterminate
                                absolute
                                height="2"
                            ></v-progress-linear>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="number"
                        label="Número"
                        type="number"
                        :rules="generalRules"
                        required
                    />
                </v-col>
            </v-row>

            <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                @input="checkPassword"
                :rules="generalRules"
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

            <v-btn
                color="green darken-3"
                class="mt-2 mb-6"
                @click="register"
                :loading="creatingUser"
                :disabled="loadingAddress || creatingUser"
                >Criar Conta</v-btn
            >
        </v-form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getModule } from 'vuex-module-decorators';

import { sha512 } from "js-sha512";

import { User } from "@/models/User";

import { validateCpf } from "@/utils/functions";

import UserModule from '@/store/modules/UserModule';

import ViaCepApi from "@/api/ViaCepApi";
import UserRepository from "@/repositories/UserRepository";


@Component
export default class Register extends Vue {
    // Models
    name: string = "";
    email: string = "";
    cpf: string = "";
    cep: string = "";
    address: string = "";
    city: string = "";
    uf: string = "";
    number: number = 0;
    password: string = "";

    // Form Rules
    cpfRules = [(cpf: string) => validateCpf(cpf) || "Este CPF é inválido"];

    emailRules = [
        (email: string) =>
            !!email ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
            "Insira um Email válido",
    ];

    cepRules = [(cep: string) => cep.length === 9 || "Digite um CEP válido"];

    // Rules to apply to all other inputs
    generalRules = [(field: string) => !!field || "O campo não pode ser vazio"];

    // Form Values
    passScore = 0;
    passProgressColor = "red";

    loadingAddress = false;

    progressColors = ["red", "orange", "yellow", "lime", "green"];

    creatingUser = false;

    userStore = getModule(UserModule, this.$store);

    async register(): Promise<void> {
        if (this.formReference.validate()) {
            this.creatingUser = true;

            let toCreate: User = {
                cpf: this.cpf.replaceAll(".", "").replace("-", ""),
                password: sha512(this.password),
                address: this.address,
                city: this.city,
                cep: this.cep.replace("-", ""),
                email: this.email,
                name: this.name,
                number: this.number.toString(),
                state: this.uf
            };

            try {
                let createdUser = await UserRepository.register(toCreate);

                this.userStore.setUser(createdUser);

                this.$router.push({ name: 'Products' });
            } catch (e) {
                this.creatingUser = false;
            }
        }
    }

    async completeAddress(): Promise<void> {
        if (!this.loadingAddress) {
            if (this.cep.length === 9) {
                this.loadingAddress = true;

                let cepData = await ViaCepApi.getCepData(this.cep);
                this.address = cepData.logradouro;
                this.city = cepData.localidade;
                this.uf = cepData.uf;

                this.loadingAddress = false;
            } else {
                this.loadingAddress = false;
            }
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

    // Cast the form reference to proper form object
    get formReference() {
        return this.$refs.registerForm as Vue & { validate: () => boolean };
    }
}
</script>