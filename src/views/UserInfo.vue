<template>
    <div>
        <div v-for="attr in user" :key="attr">
            <span>{{ attr }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import { getModule } from 'vuex-module-decorators';

import UserModule from '@/store/modules/UserModule';
import { User } from '@/models/User';

@Component
export default class UserInfo extends Vue {

    store = getModule(UserModule, this.$store);

    @Watch('store.user', { immediate: true })
    onUserLoggedChanged(newVal: User | null) {

        if (newVal === null) {
            this.$router.push({ name: 'Login' });
        }
    }

    get user(): User {
        return this.store.user!;
    }
}
</script>