import { expectTypeOf, test } from "vitest";
import { WycieczkaSzefaNaKosztFirmy, Wydatek, WydatekSzefa } from "../tasks/task5.js";
import { isWycieczkaSzefaNaKosztFirmy, isWydatek, isWydatekSzefa, skontrolujWydatki } from "../tasks/task9.js";

test("Zad 9 - type guardy", ()=>{
    expectTypeOf(isWydatek).not.toBeAny();
    expectTypeOf(isWydatek).toBeFunction();
    expectTypeOf(isWydatek).guards.toEqualTypeOf<Wydatek>();
    expectTypeOf(isWydatekSzefa).not.toBeAny();
    expectTypeOf(isWydatekSzefa).toBeFunction();
    expectTypeOf(isWydatekSzefa).guards.toEqualTypeOf<WydatekSzefa>();
    expectTypeOf(isWycieczkaSzefaNaKosztFirmy).not.toBeAny();
    expectTypeOf(isWycieczkaSzefaNaKosztFirmy).toBeFunction();
    expectTypeOf(isWycieczkaSzefaNaKosztFirmy).guards.toEqualTypeOf<WycieczkaSzefaNaKosztFirmy>();
    expectTypeOf(skontrolujWydatki).not.toBeAny();
    expectTypeOf(skontrolujWydatki).returns.toEqualTypeOf<{isKontrola: boolean; wydatek: Wydatek | WydatekSzefa | WycieczkaSzefaNaKosztFirmy | never}>();
})