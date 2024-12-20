/**
 * Zadanie 5.
 *
 * Rozszerz typ `Wydatek` o dwa nowe typy/interfejsy:
 * - `WydatekSzefa` - dodaj pole `isSzef` typu `true`
 * - `WycieczkaSzefaNaKosztFirmy` - dodaj pole `cel` typu `string` 
 *
 */

export type Wydatek = {
    kwota: number;
    opis: string;
}

//# ---

//export type WydatekSzefa = any;
// export type WycieczkaSzefaNaKosztFirmy = {};

export interface WydatekSzefa extends Wydatek{
    isSzef: boolean;
};
export interface WycieczkaSzefaNaKosztFirmy extends WydatekSzefa {
    cel:string;
};
