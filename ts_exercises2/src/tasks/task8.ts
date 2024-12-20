import { WycieczkaSzefaNaKosztFirmy, Wydatek, WydatekSzefa } from "./task5.js";
/**
 * Zadanie 8.
 *
 * Stwóz typ generyczny `PoprawWydatki` który przyjmuje dowolny typ wydatku i zwraca go z tym samym typem.
 */

export const wydatek1: Wydatek = {
    kwota: 100,
    opis: "Wydatek 1"
}

export const wydatek2: WydatekSzefa = {
    kwota: 200,
    opis: "Wydatek 2",
    isSzef: true
}

export const wydatek3: WycieczkaSzefaNaKosztFirmy = {
    kwota: 300,
    opis: "Wydatek",
    isSzef: true,
    cel: "Cypr"
}

export const poprawWydatki: PoprawWydatki = (wydatek) => {
    return {
        ...wydatek,
        kwota: wydatek.kwota * 1.23
    }
}

//# ---

export type PoprawWydatki = <T extends Wydatek>(wydatek:T) => T;

poprawWydatki(wydatek1);
poprawWydatki(wydatek2);
poprawWydatki(wydatek3);
