"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as IDGen from "docnumbering";
import { Button } from "../ui/button";
import { AlignJustify, Trash2 } from "lucide-react";
import { ListActions } from "react-use/lib/useList";
import { Rule } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { useMedia } from "react-use";

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

type IDGeneratorFormatRuleItemProps = {
  rules: Rule[];
  rulesActions: ListActions<Rule>;
  currentRule: Rule;
  currentIndex: number;
};

export function IDGeneratorFormatRuleItem(props: IDGeneratorFormatRuleItemProps) {
  const { rules, rulesActions, currentRule: rule, currentIndex: index } = props;

  function updateType(index: number, t: IDGen.RuleType) {
    if (t === IDGen.RuleType.DATETIME) {
      rulesActions.updateAt(index, {
        id: rule.id,
        type: t,
        format: IDGen.RuleFormat.YEAR_4,
      });
    }

    if (t === IDGen.RuleType.INCREMENT) {
      rulesActions.updateAt(index, {
        id: rule.id,
        type: t,
        format: IDGen.RuleFormat.BASE_10,
        fixedLength: 2,
      });
    }

    if (t === IDGen.RuleType.STATIC) {
      rulesActions.updateAt(index, {
        id: rule.id,
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
        max: f === IDGen.RuleFormat.ROMAN ? rule.max || 10 : rule.max,
      });
    }
  }

  return (
    <div key={index} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-5">
      <AlignJustify color="gray" size={16} />

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
          <SelectTrigger className={rule.type === IDGen.RuleType.INCREMENT ? "w-[100px]" : "w-[200px]"}>
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

      {rule.type === IDGen.RuleType.INCREMENT && (
        <Input
          value={String(rule.max || "")}
          onChange={(e) =>
            rulesActions.updateAt(index, { ...rule, max: e.target.value ? +String(e.target.value) : undefined })
          }
          placeholder={`Max`}
          className="max-w-[60px]"
        />
      )}

      {rule.type === IDGen.RuleType.INCREMENT && (
        <Input
          value={String(rule.fixedLength || "")}
          onChange={(e) =>
            rulesActions.updateAt(index, { ...rule, fixedLength: e.target.value ? +String(e.target.value) : undefined })
          }
          placeholder={`Length`}
          className="max-w-[60px] hidden md:block"
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
  );
}

// wrapper for dnd
export function SortableIDGeneratorFormatRuleItem(props: IDGeneratorFormatRuleItemProps) {
  const isWide = useMedia("(min-width: 900px)");

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.currentRule.id,
    disabled: !isWide,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IDGeneratorFormatRuleItem {...props} />
    </div>
  );
}
