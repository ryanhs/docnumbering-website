"use client";

import * as IDGen from "kia-id-generator";
import { Button } from "../ui/button";
import { ListActions } from "react-use/lib/useList";
import { IDGeneratorFormatRuleItem, SortableIDGeneratorFormatRuleItem } from "./format-rule-item";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Rule } from "./types";
import { Separator } from "../ui/separator";
import { CustomDate } from "./custom-date";

type IDGeneratorFormatRulesProps = {
  rules: Rule[];
  rulesActions: ListActions<Rule>;
};

export function IDGeneratorFormatRules(props: IDGeneratorFormatRulesProps) {
  const { rules, rulesActions } = props;
  const [activeId, setActiveId] = useState<number | null>(null);

  function addRule() {
    rulesActions.push({
      id: Date.now(),
      type: IDGen.RuleType.STATIC,
      value: "-",
    });
  }

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  // const touchSensor = useSensor(TouchSensor, {
  //   activationConstraint: {
  //     distance: 800,
  //     delay: 1000,
  //   },
  // });
  const sensors = useSensors(pointerSensor, mouseSensor);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(+active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = rules.findIndex((v) => v.id === active.id);
      const newIndex = rules.findIndex((v) => v.id === over.id);
      rulesActions.set(arrayMove([...rules], oldIndex, newIndex));
    }
  }

  const activeIndex = (activeId && rules.findIndex((v) => v.id === activeId)) || -1;
  const activeRule = (activeId && rules.find((v) => v.id === activeId)) || null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="space-y-4">
        <div>
          <div className=" mb-4">
            <span className="text-md lg:text-lg font-semibold">{`Customize Format`}</span>
          </div>

          <div className="space-y-4 min-w-[400px]">
            <SortableContext items={rules.map((v) => v.id)}>
              {rules.map((rule, index) => (
                <SortableIDGeneratorFormatRuleItem
                  key={index}
                  rules={rules}
                  rulesActions={rulesActions}
                  currentRule={rule}
                  currentIndex={index}
                />
              ))}
            </SortableContext>

            <DragOverlay>
              {activeId && activeRule ? (
                <IDGeneratorFormatRuleItem
                  rules={rules}
                  rulesActions={rulesActions}
                  currentRule={activeRule}
                  currentIndex={activeIndex}
                />
              ) : null}
            </DragOverlay>

            <div className="mt-10"></div>

            <Button onClick={addRule} className="w-full " variant="gray">
              {`Add Rule`}
            </Button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
