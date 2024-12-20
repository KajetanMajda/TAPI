import { Priority } from "./types/otherTypes.js";
import { Raport } from "./types/raportTypes.js";

export const generujRaport = <T>(daneRaportu: T, efektywność: number, priorytet: Priority):Promise<T & Raport> => {
    return new Promise((resolve) => {
        resolve({
        efektywność,
        priorytet,
        ...daneRaportu
    })});
}