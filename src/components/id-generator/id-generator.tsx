"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIdGenerator } from "@/hooks/useIdGenerator";
import { Separator } from "@/components/ui/separator";
import { useList } from "react-use";
import * as IDGen from "kia-id-generator";
import { IdsList } from "./id-list";

export function IDGenerator() {
  const [rules, rulesActions] = useList<IDGen.Rule>([
    { type: IDGen.RuleType.STATIC, value: "ID-" },
    { type: IDGen.RuleType.INCREMENT, fixedLength: 2 },
  ]);
  const { generator } = useIdGenerator(rules);

  const [format, setFormat] = useState("ABC-####");

  const retention = 15;
  const [ids, idsActions] = useList<string>([]);

  const generateNumber = async () => {
    const newId = await generator.nextId();

    // clean up if needed while prepend
    idsActions.set([newId, ...ids.slice(0, retention)]);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{`Document Number Generator`}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column - Customization Rules */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Customize Format</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Number Pattern</Label>
                    <Input
                      id="format"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      placeholder="Enter format (e.g., ABC-####)"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use # for numbers (e.g., ABC-#### will generate ABC-0001)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator for mobile view */}
            <Separator className="md:hidden my-4" />

            {/* Right Column - Generator and List */}
            <IdsList ids={ids} generate={() => generateNumber()} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
