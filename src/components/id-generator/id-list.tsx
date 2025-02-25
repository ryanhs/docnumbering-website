"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCopyToClipboard, useCounter } from "react-use";
import { toast } from "sonner";
import { ClipboardCopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { debounce } from "throttle-debounce";

type IdsListProps = {
  ids: string[];
  generate: () => Promise<any>;
};

export function IdsList(props: IdsListProps) {
  const { ids, generate } = props;

  const maxTimer = 3;
  const [timer, setTimer] = useState<number>(maxTimer);
  const [enableTimer, setEnableTimer] = useState<boolean>(true);
  const [counter, counterActions] = useCounter(0);
  const [, _copyToClipboard] = useCopyToClipboard();

  function copyToClipboard(val: string) {
    _copyToClipboard(val);
    toast.success(`Copied Id!`, {
      description: `> ${val}`,
    });
  }

  const generateNumber = debounce(50, async () => {
    try {
      await generate();
      counterActions.inc();
    } catch (err: any) {
      toast.error(`Failed to generate new id!`, {
        description: String(err?.message),
      });
    }
  });

  const generateNumberManual = () => {
    setEnableTimer(false);
    return generateNumber();
  };

  useEffect(() => {
    if (enableTimer) {
      const i = setInterval(() => {
        setTimer((pt) => {
          const nt = pt - 1;

          if (nt < 1) {
            generateNumber();
            return maxTimer;
          }

          return nt;
        });
      }, 1000);

      return () => clearInterval(i);
    }
  }, [enableTimer, timer]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4 min-w-[250px]">
          {`Generated IDs`} {!!counter && `(${counter})`}
        </h3>

        <Button onClick={() => generateNumberManual()} className="w-full mb-4">
          {`Generate New ID`}
          <span className="text-xs">{enableTimer && ` (${timer}s)`}</span>
        </Button>

        <Card>
          <ScrollArea className="w-full rounded-md border p-4 h-[350px]">
            {ids.length === 0 ? (
              <p className="text-center text-muted-foreground">{`Generated numbers will appear here`}</p>
            ) : (
              <div className="space-y-2 pr-2">
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
