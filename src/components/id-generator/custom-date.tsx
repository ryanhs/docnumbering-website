import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";

type CustomDateProps = {
  today: Date;
  setToday: (n: Date) => any;
};

export function CustomDate(props: CustomDateProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal")}>
          {DateTime.fromJSDate(props.today).toLocaleString(DateTime.DATE_MED)}

          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={props.today} onSelect={(ev) => ev && props.setToday(ev)} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
