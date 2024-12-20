import { expectTypeOf, test } from "vitest";
import { kontrolaZNotatką, KontrolaZNotatkąOdSzefa, wszystkieKontrole, WszystkieKontrole } from "../tasks/task2.js";

test("Zad 2 - rozszerzony typ kontroli", ()=>{
    expectTypeOf<KontrolaZNotatkąOdSzefa>().not.toBeAny();
    expectTypeOf<WszystkieKontrole>().not.toBeAny();
    expectTypeOf(kontrolaZNotatką).toEqualTypeOf<KontrolaZNotatkąOdSzefa>();
    expectTypeOf(wszystkieKontrole).toEqualTypeOf<WszystkieKontrole>();
})