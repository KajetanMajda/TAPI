import { expectTypeOf, test } from "vitest";
import { Kontrola, kontrola1, kontrola2 } from "../tasks/task1.js";
import { WycieczkaSzefaNaKosztFirmy, WydatekSzefa } from "../tasks/task5.js";

test("Zad 5 - roszerzenie typów", ()=>{
    expectTypeOf<WydatekSzefa>().not.toBeAny();
    expectTypeOf<WydatekSzefa>().toHaveProperty("isSzef").toBeBoolean();
    expectTypeOf<WycieczkaSzefaNaKosztFirmy>().not.toBeAny();
    expectTypeOf<WycieczkaSzefaNaKosztFirmy>().toHaveProperty("isSzef").toBeBoolean();
    expectTypeOf<WycieczkaSzefaNaKosztFirmy>().toHaveProperty("cel").toBeString();
})