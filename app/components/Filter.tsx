import { format } from "date-fns";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "~/lib/utils";

type Props = {
  defaultDate?: Date;
  onDateFilter: (date: Date) => void;
};

export default function Filter({ onDateFilter, defaultDate }: Props) {
  const [date, setDate] = useState<Date | undefined>(defaultDate);

  return (
    <section className="pt-5">
      <h4 className="pb-2">Filter News</h4>
      <div>
        <div>
          <div className="text-sm text-gray-600">Publised Date</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  if (date) {
                    setDate(date);
                    onDateFilter(date);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
}
