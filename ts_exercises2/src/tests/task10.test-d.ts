import { expectTypeOf, test } from "vitest";
import { JeszczeStarszaKontrola, PartialKontrola, StaraKontrola } from "../tasks/task10.js";

test("Zad 10 - typ częściowo opcjonalny", ()=>{
    expectTypeOf<PartialKontrola<any>>().not.toBeAny();
    expectTypeOf<PartialKontrola<StaraKontrola>>().toHaveProperty("opis").toBeString();
    expectTypeOf<PartialKontrola<StaraKontrola>>().toHaveProperty("data").toEqualTypeOf<string | undefined>();
    expectTypeOf<PartialKontrola<JeszczeStarszaKontrola>>().toHaveProperty("status").toBeString();
    expectTypeOf<PartialKontrola<StaraKontrola>>().toHaveProperty("data").toEqualTypeOf<string | undefined>();
})