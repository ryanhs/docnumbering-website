"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface Rule {
  id: string
  name: string
  type: string
  format: string
  min?: number
  max?: number
}

const RULE_TYPES = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "date", label: "Date" },
]

const RULE_FORMATS = [
  { value: "none", label: "None" },
  { value: "email", label: "Email" },
  { value: "url", label: "URL" },
  { value: "phone", label: "Phone" },
  { value: "custom", label: "Custom" },
]

export default function RulesForm() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: "1",
      name: "Example rule",
      type: "string",
      format: "none",
    },
  ])

  const addRule = () => {
    const newRule = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      type: "string",
      format: "none",
    }
    setRules([...rules, newRule])
  }

  const deleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const updateRule = (id: string, updates: Partial<Rule>) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)))
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle>Customize Rules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-5">
            <Input
              value={rule.name}
              onChange={(e) => updateRule(rule.id, { name: e.target.value })}
              placeholder="Rule name"
              className="max-w-[200px]"
            />

            <Select value={rule.type} onValueChange={(value) => updateRule(rule.id, { type: value })}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {RULE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={rule.format} onValueChange={(value) => updateRule(rule.id, { format: value })}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {RULE_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {rule.type === "number" && (
              <>
                <Input
                  type="number"
                  value={rule.min ?? ""}
                  onChange={(e) => updateRule(rule.id, { min: e.target.valueAsNumber })}
                  placeholder="Min"
                  className="w-[100px]"
                />
                <Input
                  type="number"
                  value={rule.max ?? ""}
                  onChange={(e) => updateRule(rule.id, { max: e.target.valueAsNumber })}
                  placeholder="Max"
                  className="w-[100px]"
                />
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteRule(rule.id)}
              className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              aria-label="Delete rule"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button onClick={addRule} variant="outline" className="w-full mt-4">
          Add Rule
        </Button>
      </CardContent>
    </Card>
  )
}

