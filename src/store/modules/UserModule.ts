import { MiniatureCart } from "@/models/MiniatureCart";
import { User } from "@/models/User";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true, name: 'UserModule' })
export default class UserModule extends VuexModule {

    user: User | null = null;
    cart: Array<MiniatureCart> = [];

    @Mutation
    setUser(user: User | null): void {
        this.user = user;
    }

    @Mutation
    addToCart(product: MiniatureCart) {
        this.cart.push(product);
    }

    @Mutation
    setCart(cart: Array<MiniatureCart>) {
        this.cart = cart;
    }
}