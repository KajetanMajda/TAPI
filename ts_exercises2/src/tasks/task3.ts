/**
 * Zadanie 3.
 *
 * Stwórz typ `KontroleZaRok` będący obiektem, w którym kluczem jest rok,
 * a wartością boolean określający czy kontrola została przeprowadzona.
 */

export type KontroleZaRok = {
    [rok: number]: boolean;
};

export const kontroleZaRok: KontroleZaRok = {
    2019: true,
    2020: false,
    2021: false,
    2022: true,
    2023: true,
}