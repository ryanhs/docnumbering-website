import { Rule } from "./types";
import * as IDGen from "kia-id-generator";

export const defaultRules: Rule[] = [
  { id: 1, type: IDGen.RuleType.STATIC, value: "DOC" },
  { id: 2, type: IDGen.RuleType.STATIC, value: "/" },
  { id: 3, type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.YEAR_4 },
  { id: 4, type: IDGen.RuleType.STATIC, value: "-" },
  { id: 5, type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.QUARTER_ROMAN },
  { id: 6, type: IDGen.RuleType.STATIC, value: "/" },
  { id: 7, type: IDGen.RuleType.INCREMENT, fixedLength: 2, format: IDGen.RuleFormat.BASE_10 },
];
