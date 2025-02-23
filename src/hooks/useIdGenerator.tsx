import * as IDGen from "kia-id-generator";
import { useMemo, useState } from "react";

// const rules: IDGen.Rule[] = [
//   {
//     type: IDGen.RuleType.STATIC,
//     value: "E",
//   },
//   {
//     type: IDGen.RuleType.DATETIME,
//     format: IDGen.RuleFormat.YEAR_2,
//   },
//   {
//     type: IDGen.RuleType.INCREMENT,
//     format: IDGen.RuleFormat.BASE_10,
//     fixedLength: 3,
//   },
// ];

export function useIdGenerator(rules: IDGen.Rule[]) {
  const store = useMemo(() => new IDGen.MemoryStore(), [...rules]);
  const generator = useMemo(() => IDGen.identityGenerator(rules, store), [store, ...rules]);

  return { store, generator };
}
