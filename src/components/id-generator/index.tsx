"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIdGenerator } from "@/hooks/useIdGenerator";
import { Separator } from "@/components/ui/separator";
import { useList, useMedia } from "react-use";
import { IdsList } from "./id-list";
import { IDGeneratorFormatRules } from "./format-rules";
import { Rule } from "./types";
import { CustomDate } from "./custom-date";
import { examples, QuarterlyDocument } from "./examples";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function IDGenerator() {
  const isWide = useMedia("(min-width: 900px)");

  const [rules, rulesActions] = useList<Rule>(examples[0].rules);
  const [today, setToday] = useState<Date>(new Date());
  const { generator } = useIdGenerator(rules, today);

  const retention = 15;
  const [ids, idsActions] = useList<string>([]);

  const generateNumber = async () => {
    const newId = await generator.nextId();

    // clean up if needed while prepend
    idsActions.set([newId, ...ids.slice(0, retention)]);
  };

  function setExample(expLabel: string, expRules: Rule[]) {
    rulesActions.set([...expRules]);
    toast.info(`Using Example "${expLabel}"`);
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{`Document Number Generator`}</CardTitle>
          <CardDescription className="flex gap-1">
            {examples.map((exp) => (
              <Badge
                variant="outline"
                onClick={() => setExample(exp.label, exp.rules)}
                className={cn("hover:cursor-pointer", exp.classname)}
              >
                {exp.label}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column - Customization Rules */}
            <IDGeneratorFormatRules rules={rules} rulesActions={rulesActions} />

            {/* Separator for mobile view */}
            <Separator className="md:hidden my-4" />

            {/* Right Column - Generator and List */}
            <IdsList ids={ids} generate={() => generateNumber()} />
          </div>
        </CardContent>
      </Card>

      <CustomDate today={today} setToday={setToday} />
      {!isWide && (
        <p className="italic">{`* For the best experience, use a desktop to access the full editor with sortable rules.`}</p>
      )}
    </div>
  );
}
