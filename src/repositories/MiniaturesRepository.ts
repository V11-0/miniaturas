import { Miniature } from "@/models/Miniature";
import axios from "@/utils/axios";

export default class MiniaturesRepository {

    public static async getMiniatures(): Promise<Array<Miniature>> {
        const resp = await axios.get("/miniatures");
        return resp.data;
    }
}