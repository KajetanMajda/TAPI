import { expectTypeOf, test } from "vitest";
import { Kontrola, kontrola1, kontrola2 } from "../tasks/task1.js";

test("Zad 1 - typ kontroli", ()=>{
    expectTypeOf<Kontrola>().not.toBeAny();
    expectTypeOf(kontrola1).toEqualTypeOf<Kontrola>();
    expectTypeOf(kontrola2).toEqualTypeOf<Kontrola>();
    expectTypeOf<Kontrola>().toHaveProperty("status").toBeString();
    expectTypeOf<Kontrola>().toHaveProperty("status").toEqualTypeOf<"ok" | "nok">();
    expectTypeOf([kontrola1, kontrola2]).toEqualTypeOf<Kontrola[]>();
    expectTypeOf<Kontrola['status']>().not.toEqualTypeOf<{status: "ok" | "nok"}>();
})