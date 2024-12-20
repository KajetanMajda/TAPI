/**
 * Zadanie 4.
 *
 * Stwórz typ `KontrolujKreatywnie` będący funkcją,
 * która przyjmuje obiekt typu `Kontrola` i zwraca obiekt typu `Kontrola`.
 * Stwórz typ `ZaksięgujKreatywnie` będący funkcją,
 * która przyjmuje dowolną liczbę argumentów typu `number` i zwraca tablicę obiektów typu `KreatywnyWydatek`.
 */

import { Kontrola } from "./task1.js";

export type KreatywnyWydatek = {
    wydatek: number;
    opis: string;
}
export type KontrolujKreatywnie = (kontrola: Kontrola) => {
    () : Kontrola;
};
export type ZaksięgujKreatywnie = (...number:number[]) => {
    (): KreatywnyWydatek[];
};

export const kreatywneWydatki: ZaksięgujKreatywnie = (...wydatki: any) => {
    const listaWydatków: any = [];
    for (const wydatek in wydatki) {
        listaWydatków.push({
            wydatek: wydatek,
            opis: "Wydatek kreatywny"
        });
    }
    return listaWydatków;
}

export const kreatywnaKontrola: KontrolujKreatywnie = (kontrola: any) => {
    const wydatki = kreatywneWydatki(100, 200, 300);
    return {
        ...kontrola,
        opis: "Kreatywny opis"
    }
}