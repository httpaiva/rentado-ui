"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  field,
  placeholder = "Selecione uma data",
}: {
  field: any;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <FormControl> */}
          <Button
            variant={"outline"}
            className={cn(
              "w-full text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              format(field.value.toString(), "PPP", { locale: ptBR })
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-3 w-4 opacity-50" />
          </Button>
        {/* </FormControl> */}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
