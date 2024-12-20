import pracownicy from '../dane/pracownicy.json' assert { type: "json" };
import { listaPracowników } from "./index.js";
import { Stanowisko, Waluta, PowódZwolnienia } from "./types/pracownikTypes.js";


export const dodajPracownikówZListy = () => { //nie otypowana
    pracownicy.forEach(pracownik => {
            dodajPracownika(pracownik);
    });
};

export const dodajNowegoPracownika = (imie:string, nazwisko:string, stanowisko:Stanowisko, pensja:[number, Waluta], zwolnij: (...powody: PowódZwolnienia[]) => void) => {
    listaPracowników.push({
        imie,
        nazwisko,
        stanowisko,
        pensja,
        zwolnij
    });
}
export const dodajPracownika = (pracownik) => {
    listaPracowników.push(pracownik);
}

export const zwolnijPracownika = (id, powody) => {
    const pracownik = listaPracowników/* ?? */.find(pracownik => pracownik.id === id);
    if (pracownik) {
            pracownik.zwolnij(powody);
    }
}

const zwolnijGo = (/* ?? */powody) =>{
    powody.forEach(powód => {
            console.log("Zwolniono z powodu numer: " + powód);
            console.log("Zwolniono z powodu: " + powód);
            console.log("NIE UDAŁO SIĘ ZWOLNIĆ, ZOSTAJĘ W TYM GRAJDOŁKU!");
    });
}