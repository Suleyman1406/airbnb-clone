import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface ICalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}
const Calendar = ({ value, disabledDates, onChange }: ICalendarProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      date={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
