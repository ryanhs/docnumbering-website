"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCopyToClipboard, useCounter } from "react-use";
import { toast } from "sonner";
import { ClipboardCopyIcon } from "lucide-react";

type IdsListProps = {
  ids: string[];
  generate: () => Promise<any>;
};

export function IdsList(props: IdsListProps) {
  const { ids, generate } = props;

  const [counter, counterActions] = useCounter(0);
  const [, _copyToClipboard] = useCopyToClipboard();

  function copyToClipboard(val: string) {
    _copyToClipboard(val);
    toast.success(`Copied Id!`, {
      description: `> ${val}`,
    });
  }

  const generateNumber = async () => {
    try {
      await generate();
      counterActions.inc();
    } catch (err: any) {
      toast.error(`Failed to generate new id!`, {
        description: String(err?.message),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4 min-w-[250px]">
          {`Generated IDs`} {!!counter && `(${counter})`}
        </h3>

        <Button onClick={generateNumber} className="w-full mb-4" variant={"green"}>
          {`Generate New ID`}
        </Button>

        <Card>
          <ScrollArea className="max-h-[350px] w-full rounded-md border p-4">
            {ids.length === 0 ? (
              <p className="text-center text-muted-foreground">{`Generated numbers will appear here`}</p>
            ) : (
              <div className="space-y-2">
                {ids.map((id, index) => (
                  <div key={index} className="rounded bg-muted px-3 py-2 font-mono h-[53px]">
                    <Button variant={"outline"} className="float-right" onClick={() => copyToClipboard(id)}>
                      <ClipboardCopyIcon />
                    </Button>

                    <p className="gap-2 whitespace-nowrap rounded-md text-sm font-medium mt-2">{id}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
