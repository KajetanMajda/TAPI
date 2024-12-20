import { expectTypeOf, test } from "vitest";
import { WycieczkaSzefaNaKosztFirmy, Wydatek, WydatekSzefa } from "../tasks/task5.js";
import { poprawWydatki, PoprawWydatki, wydatek1, wydatek2, wydatek3 } from "../tasks/task8.js";

test("Zad 8 - funkcja generyczna", ()=>{
    expectTypeOf<PoprawWydatki>().not.toBeAny();
    expectTypeOf<PoprawWydatki>().toBeFunction();
    expectTypeOf<PoprawWydatki>().parameter(0).toEqualTypeOf<Wydatek>();
    expectTypeOf(poprawWydatki(wydatek1)).toEqualTypeOf<Wydatek>();
    expectTypeOf(poprawWydatki(wydatek2)).toEqualTypeOf<WydatekSzefa>();
    expectTypeOf(poprawWydatki(wydatek3)).toEqualTypeOf<WycieczkaSzefaNaKosztFirmy>();
})