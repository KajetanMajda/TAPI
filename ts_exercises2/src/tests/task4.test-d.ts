import { expectTypeOf, test } from "vitest";
import { Kontrola } from "../tasks/task1.js";
import { KontrolujKreatywnie, kreatywnaKontrola, kreatywneWydatki, ZaksięgujKreatywnie } from "../tasks/task4.js";

test("Zad 4 - typy funkcji", ()=>{
    expectTypeOf<KontrolujKreatywnie>().not.toBeAny();
    expectTypeOf<KontrolujKreatywnie>().toBeFunction();
    expectTypeOf<KontrolujKreatywnie>().parameter(0).toEqualTypeOf<Kontrola>();
    expectTypeOf<ZaksięgujKreatywnie>().not.toBeAny();
    expectTypeOf<ZaksięgujKreatywnie>().toBeFunction();
    expectTypeOf<ZaksięgujKreatywnie>().parameters.toEqualTypeOf<number[]>();
    expectTypeOf(kreatywnaKontrola).toEqualTypeOf<KontrolujKreatywnie>();
    expectTypeOf(kreatywneWydatki).toEqualTypeOf<ZaksięgujKreatywnie>();
})