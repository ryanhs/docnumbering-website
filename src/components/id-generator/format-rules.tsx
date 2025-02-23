"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as IDGen from "kia-id-generator";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { ListActions } from "react-use/lib/useList";

const typeOptions: IDGen.RuleType[] = [
  IDGen.RuleType.STATIC,
  IDGen.RuleType.DATETIME,
  IDGen.RuleType.INCREMENT,
  // IDGen.RuleType.RANDOM,
];

const formatOptions: { [k: string]: [string, IDGen.RuleFormat][] } = {
  [IDGen.RuleType.DATETIME]: [
    ["YEAR 4 (YYYY)", IDGen.RuleFormat.YEAR_4],
    ["YEAR 2 (YY)", IDGen.RuleFormat.YEAR_2],
    ["Quarter (3)", IDGen.RuleFormat.QUARTER],
    ["Quarter ROMAN (IV)", IDGen.RuleFormat.QUARTER_ROMAN],
    ["MONTH_2", IDGen.RuleFormat.MONTH_2],
    ["MONTH_1", IDGen.RuleFormat.MONTH_1],
    ["DATE_2", IDGen.RuleFormat.DATE_2],
    ["DATE_1", IDGen.RuleFormat.DATE_1],
  ],

  [IDGen.RuleType.INCREMENT]: [
    ["Standard", IDGen.RuleFormat.BASE_10],
    ["0-9A-F", IDGen.RuleFormat.BASE_16],
    ["0-9A-Z", IDGen.RuleFormat.BASE_36],
    ["Roman", IDGen.RuleFormat.ROMAN],
  ],
};

type IDGeneratorFormatRulesProps = {
  rules: IDGen.Rule[];
  rulesActions: ListActions<IDGen.Rule>;
};

export function IDGeneratorFormatRules(props: IDGeneratorFormatRulesProps) {
  const { rules, rulesActions } = props;

  function addRule() {
    rulesActions.push({
      type: IDGen.RuleType.STATIC,
      value: "-",
    });
  }

  function updateType(index: number, t: IDGen.RuleType) {
    if (t === IDGen.RuleType.DATETIME) {
      rulesActions.updateAt(index, {
        type: t,
        format: IDGen.RuleFormat.YEAR_4,
      });
    }

    if (t === IDGen.RuleType.INCREMENT) {
      rulesActions.updateAt(index, {
        type: t,
        format: IDGen.RuleFormat.BASE_10,
        fixedLength: 2,
      });
    }

    if (t === IDGen.RuleType.STATIC) {
      rulesActions.updateAt(index, {
        type: t,
        value: "-",
      });
    }
  }

  function updateFormat(index: number, f: IDGen.RuleFormat) {
    const rule = rules[index];

    if (rule.type === IDGen.RuleType.DATETIME) {
      rulesActions.updateAt(index, {
        ...rule,
        format: f,
      });
    }

    if (rule.type === IDGen.RuleType.INCREMENT) {
      rulesActions.updateAt(index, {
        ...rule,
        format: f,
      });
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Customize Format</h3>

        <div className="space-y-4 min-w-[400px]">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-5">
              <Select value={rule.type} onValueChange={(value) => updateType(index, value as IDGen.RuleType)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formatOptions[rule.type] && (
                <Select value={rule.format} onValueChange={(value) => updateFormat(index, value as IDGen.RuleFormat)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions[rule.type].map(([l, v]) => (
                      <SelectItem key={v} value={v}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {rule.type === IDGen.RuleType.STATIC && (
                <Input
                  value={rule.value}
                  onChange={(e) => rulesActions.updateAt(index, { ...rule, value: String(e.target.value) })}
                  placeholder={`Static Value`}
                  className="max-w-[200px]"
                />
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => rulesActions.removeAt(index)}
                className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                aria-label={`Delete rule ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button onClick={addRule} className="w-full mt-4" variant="outline">
            Add Rule
          </Button>
        </div>
      </div>
    </div>
  );
}
