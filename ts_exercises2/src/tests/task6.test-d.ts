import { expectTypeOf, test } from "vitest";
import { TypKontroliZUrzędu } from "../tasks/task6.js";

test("Zad 6 - typ zwracany z async funkcji", ()=>{
    expectTypeOf<TypKontroliZUrzędu>().not.toBeAny();
    expectTypeOf<TypKontroliZUrzędu>().toHaveProperty("zdane").toBeBoolean();
    expectTypeOf<TypKontroliZUrzędu>().toHaveProperty("isPies").toBeBoolean();
    expectTypeOf<TypKontroliZUrzędu>().toHaveProperty("czySzefMaZnajomychWZarządzie").toBeBoolean();
    expectTypeOf<TypKontroliZUrzędu>().toHaveProperty("firmaDoZamkniecia").toBeBoolean();
})