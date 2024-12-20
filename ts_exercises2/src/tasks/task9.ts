import { WycieczkaSzefaNaKosztFirmy, Wydatek, WydatekSzefa } from "./task5.js";
/**
 * Zadanie 9.
 *
 * Utwórz funkcję `isWydatek`, która sprawdzi, czy przekazany obiekt jest typu `Wydatek`.
 * Utwórz funkcję `isWydatekSzefa`, która sprawdzi, czy przekazany obiekt jest typu `WydatekSzefa`.
 * Utwórz funkcję `isWycieczkaSzefaNaKosztFirmy`, która sprawdzi, czy przekazany obiekt jest typu `WycieczkaSzefaNaKosztFirmy`.
 */

type Wydatki = Wydatek | WydatekSzefa | WycieczkaSzefaNaKosztFirmy;

export const skontrolujWydatki = (wydatek: Wydatki) => {
    const skontrolowanyWydatek = {
        wydatek,
        isKontrola: false
    }
    if (isWydatekSzefa(wydatek)) {
        return skontrolowanyWydatek;
    } else if (isWycieczkaSzefaNaKosztFirmy(wydatek)) {
        return skontrolowanyWydatek;
    } else if (isWydatek(wydatek)) {
        return skontrolowanyWydatek;
    } else {
        return skontrolowanyWydatek;
    }
}

//# ---

export const isWydatek = (wydatek: Wydatki): wydatek is Wydatek => { 
    return (typeof (wydatek as Wydatek).kwota !== 'undefined')
}

export const isWydatekSzefa = (wydatek: Wydatki): wydatek is WydatekSzefa => { 
    return (typeof (wydatek as WydatekSzefa).isSzef !== 'undefined')
 }

export const isWycieczkaSzefaNaKosztFirmy = (wydatek: Wydatki): wydatek is WycieczkaSzefaNaKosztFirmy => { 
    return (typeof (wydatek as WycieczkaSzefaNaKosztFirmy).cel !== 'undefined')
 }