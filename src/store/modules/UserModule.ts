import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true, name: 'UserModule' })
export default class UserModule extends VuexModule {

    username: string | null = null;

    @Mutation
    setUsername(name: string) {
        this.username = name;
    }
}