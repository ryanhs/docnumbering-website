import { Rule } from "@/components/id-generator/types";
import * as IDGen from "docnumbering";
import { useMemo } from "react";

export function useIdGenerator(rules: Rule[], today?: Date) {
  const store = useMemo(() => new IDGen.MemoryStore(), [rules]);
  const generator = useMemo(
    () =>
      IDGen.identityGenerator(rules, store, {
        now: today,
      }),
    [store, rules, today]
  );

  return { store, generator };
}
