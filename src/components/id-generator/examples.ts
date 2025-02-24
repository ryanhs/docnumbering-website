import { Rule } from "./types";
import * as IDGen from "docnumbering";

export const QuarterlyDocument: IDGen.Rule[] = [
  { type: IDGen.RuleType.STATIC, value: "DOC" },
  { type: IDGen.RuleType.STATIC, value: "/" },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.YEAR_4 },
  { type: IDGen.RuleType.STATIC, value: "-" },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.QUARTER_ROMAN },
  { type: IDGen.RuleType.STATIC, value: "/" },
  { type: IDGen.RuleType.INCREMENT, fixedLength: 2, format: IDGen.RuleFormat.BASE_10 },
];

export const ITAssets: IDGen.Rule[] = [
  { type: IDGen.RuleType.STATIC, value: "IT" },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.YEAR_2 },
  { type: IDGen.RuleType.INCREMENT, fixedLength: 5, format: IDGen.RuleFormat.BASE_10 },
];

export const Invoices: IDGen.Rule[] = [
  { type: IDGen.RuleType.STATIC, value: "INV" },
  { type: IDGen.RuleType.STATIC, value: "-" },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.YEAR_2 },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.MONTH_2 },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.DATE_2 },
  { type: IDGen.RuleType.INCREMENT, fixedLength: 3, format: IDGen.RuleFormat.BASE_10 },
];

export const Policies: IDGen.Rule[] = [
  { type: IDGen.RuleType.STATIC, value: "POL" },
  { type: IDGen.RuleType.STATIC, value: "/" },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.YEAR_4 },
  { type: IDGen.RuleType.STATIC, value: "-" },
  { type: IDGen.RuleType.DATETIME, format: IDGen.RuleFormat.QUARTER_ROMAN },
  { type: IDGen.RuleType.STATIC, value: "/" },
  { type: IDGen.RuleType.INCREMENT, fixedLength: 3, format: IDGen.RuleFormat.BASE_10 },
  { type: IDGen.RuleType.STATIC, value: "-" },
  { type: IDGen.RuleType.STATIC, value: "000" },
];

const toRules = (rules: IDGen.Rule[]): Rule[] => rules.map((r, i) => ({ ...r, id: i + 1 }));

export const examples: { label: string; rules: Rule[]; classname?: string }[] = [
  { label: "Documents", rules: toRules(QuarterlyDocument), classname: "bg-green-100" },
  { label: "IT Assets", rules: toRules(ITAssets), classname: "bg-blue-100" },
  { label: "Invoices", rules: toRules(Invoices), classname: "bg-gray-100" },
  { label: "Policies", rules: toRules(Policies), classname: "bg-orange-100" },
];
