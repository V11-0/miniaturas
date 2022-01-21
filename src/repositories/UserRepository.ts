import { User } from "@/models/User";

import axios from "@/utils/axios";

export default class UserRepository {

    public static async login(cpf: string, password: string): Promise<User> {

        // Remove extra characters from cpf
        cpf = cpf.replaceAll(".", "");
        cpf = cpf.replace("-", "");

        const resp = await axios.post("/users/login", { cpf, password });
        return resp.data;
    }

    public static async register(user: User): Promise<User> {
        const resp = await axios.post("/users/save", user);
        return resp.data;
    }

    public static async saveHistory(userId: number, miniatureId: number): Promise<void> {
        await axios.post("/users/history/add-miniature", { userId, miniatureId });
    }
}