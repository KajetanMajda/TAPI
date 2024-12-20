/**
 * Zadanie 6.
 *
 * Stwórz typ `TypKontroliZUrzędu` będący typem zwracanym przez funkcję `WynikKontroli`.
 */

type AJHSF = {
    zdane: boolean,
    isPies: boolean,
    firmaDoZamkniecia: boolean,
    czySzefMaZnajomychWZarządzie: boolean,
}

export const WynikKontroli = () => {
    return new Promise((resolve: (v:AJHSF)=>void, reject) => {
        const wynik = {
            zdane: true,
            isPies: true,
            firmaDoZamkniecia: false,
            czySzefMaZnajomychWZarządzie: true,
        }
        resolve(wynik);
    });
}

//# ---

export type TypKontroliZUrzędu = Awaited<ReturnType <typeof WynikKontroli>>;