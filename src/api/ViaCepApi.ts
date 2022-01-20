import axios from "axios";

export default class ViaCepApi {

    public static async getCepData(cep: string): Promise<CepData> {
        cep = cep.replace("-", "");

        const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        return resp.data;
    }
}

export interface CepData {
    logradouro: string;
    localidade: string;
    uf: string;
}