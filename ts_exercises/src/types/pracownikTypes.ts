export interface Pracownik {
    id: number;
    imie: string;
    nazwisko: string;
    stanowisko: Stanowisko;
    pseudonim: string;
    opis: string;
    pensja: [number, Waluta];
    zwolnij: (...powody: PowódZwolnienia[]) => void;
  }

export enum Waluta {
    Złoty_Polski_Peelen, Erło_jedne_niemieckie, Dolar_fajny_taki_amerykanski
}

export type Stanowisko = "szef" | "anetka" | "pani basia" | "podbutnik";

export type PowódZwolnienia = string | number;