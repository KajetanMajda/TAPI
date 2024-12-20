import { expectTypeOf, test } from "vitest";
import { wynikiAleZTypem } from "../tasks/task7.js";

test("Zad 7 - rzutowanie", ()=>{
    expectTypeOf(wynikiAleZTypem).not.toBeAny();
    expectTypeOf(wynikiAleZTypem).not.toBeUnknown();
    expectTypeOf(wynikiAleZTypem).toHaveProperty(0).toBeString();
    expectTypeOf(wynikiAleZTypem).toMatchTypeOf<Record<any, any>>();
    expectTypeOf(wynikiAleZTypem).toMatchTypeOf<Record<number, string>>();
})