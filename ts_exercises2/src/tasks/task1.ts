/**
 * Zadanie 1.
 *
 * Stwórz typ `Kontrola` reprezentujący kontrolę przeprowadzoną w firmie.
 * Kontrola ma zawierać następujące pola:
 * - `id` - numer identyfikacyjny
 * - `data` - data przeprowadzenia kontroli
 * - `godzina` - godzina przeprowadzenia kontroli
 * - `miejsce` - miejsce przeprowadzenia kontroli
 * - `typ` - typ kontroli
 * - `opis` - opis kontroli
 * - `status` - status kontroli, może być jednym z dwóch: "ok" lub "nok"
 */

export const kontrola1: Kontrola = {
    id: 1,
    data: "2021-01-01",
    godzina: "12:00",
    miejsce: "Biuro",
    typ: "Kontrola chaosu",
    opis: "Skontrolowano stan chaosu w biurze",
    status: "ok"
}

export const kontrola2: Kontrola = {
    id: 2,
    data: "2021-01-01",
    godzina: "10:00",
    miejsce: "Parking",
    typ: "Kontrola ilości miejsc parkingowych",
    opis: "Skontrolowano ilość miejsc parkingowych",
    status: "nok"
}

export type Kontrola = {
    id: number,
    data: string,
    godzina: string,
    miejsce: string,
    typ: string,
    opis: string,
    status: "ok" | "nok"
};