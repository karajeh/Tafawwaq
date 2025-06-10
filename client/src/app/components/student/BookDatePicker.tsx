/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";
import { parseDate, today as todayFn } from "@internationalized/date";

const BookDatePicker = ({
  date,
  setDate,
}: {
  date: string;
  setDate: (newDate: string) => void;
}) => {
  const [error, setError] = useState("");

  const handleDateChange = (value: any) => {
    const selectedDate = new Date(value.year, value.month - 1, value.day);
    const now = new Date();
    const maxDate = new Date();
    maxDate.setDate(now.getDate() + 7);

    if (selectedDate < now) {
      setError("You cannot select a past date.");
      const today = todayFn("UTC");
      setDate(today.toString());
    } else if (selectedDate > maxDate) {
      setError("You cannot select a date more than 7 days ahead.");
      const today = todayFn("UTC");
      setDate(today.toString());
    } else {
      setError("");
      const formatted = `${value.year}-${String(value.month).padStart(
        2,
        "0"
      )}-${String(value.day).padStart(2, "0")}`;
      setDate(formatted);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex rounded-xl border border-slate py-2 px-4">
        <DatePicker
          className={"w-full"}
          value={date ? parseDate(date) : undefined}
          onChange={handleDateChange}
        >
          <Group className={"w-full flex items-center justify-between"}>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button>▼</Button>
          </Group>
          <Popover>
            <div className="bg-white w-80 p-3 shadow-lg shadow-slate">
              <Dialog className="w-full">
                <Calendar className="w-full">
                  <header className="w-full flex items-center justify-between">
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                  </header>
                  <CalendarGrid className="w-full">
                    {(date) => (
                      <CalendarCell
                        date={date}
                        className={({
                          isSelected,
                          isOutsideMonth,
                        }) =>
                          `p-2 flex items-center justify-center ${
                            isSelected
                              ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                              : isOutsideMonth
                              ? "text-slate cursor-default"
                              : "hover:bg-blue-200"
                          }`
                        }
                      />
                    )}
                  </CalendarGrid>
                </Calendar>
              </Dialog>
            </div>
          </Popover>
        </DatePicker>
      </div>
      {error && <div className="text-red-500 text-xs px-2">{error}</div>}
    </div>
  );
};

export default BookDatePicker;
