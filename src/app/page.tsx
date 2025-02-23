"use client";

import * as ID from "kia-id-generator";
import { useState } from "react";

const rules: ID.Rule[] = [
  {
    type: ID.RuleType.STATIC,
    value: "E",
  },
  {
    type: ID.RuleType.DATETIME,
    format: ID.RuleFormat.YEAR_2,
  },
  {
    type: ID.RuleType.INCREMENT,
    format: ID.RuleFormat.BASE_10,
    fixedLength: 3,
  },
];

const store = new ID.MemoryStore();
const generator = ID.identityGenerator(rules, store);

export default function Home() {
  const [id, setId] = useState<string>('');
  
  async function generate() {
    setId(await generator.nextId())
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>ID: {id}</p>
        </div>
        
        <button onClick={() => generate()}>{`Generate`}</button>
      </main>
    </div>
  );
}
