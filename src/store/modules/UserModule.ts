import { User } from "@/models/User";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true, name: 'UserModule' })
export default class UserModule extends VuexModule {

    user: User | null = null;

    @Mutation
    setUser(user: User | null): void {
        this.user = user;
    }
}