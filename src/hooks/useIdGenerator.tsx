import * as IDGen from "kia-id-generator";
import { useMemo } from "react";

export function useIdGenerator(rules: IDGen.Rule[]) {
  const store = useMemo(() => new IDGen.MemoryStore(), [rules]);
  const generator = useMemo(() => IDGen.identityGenerator(rules, store), [store, rules]);

  return { store, generator };
}
