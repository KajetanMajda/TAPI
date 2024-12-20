import { expectTypeOf, test } from "vitest";
import { kontroleZaRok, KontroleZaRok } from "../tasks/task3.js";

test("Zad 3 - typ obiektu", ()=>{
    expectTypeOf<KontroleZaRok>().not.toBeAny();
    expectTypeOf(kontroleZaRok).toEqualTypeOf<KontroleZaRok>();
    expectTypeOf<KontroleZaRok>().toBeObject();
    expectTypeOf<KontroleZaRok>().toHaveProperty(1).toBeBoolean();
})