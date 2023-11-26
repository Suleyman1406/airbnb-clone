"use client";

import { CountrySelectValue } from "@/app/types";
import React from "react";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

interface ICountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect = ({ value, onChange }: ICountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        isClearable
        value={value}
        options={getAll()}
        placeholder="Anywhere"
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1 ">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg ",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...(theme?.colors ?? {}),
            primary: "black",
            primary25: "#ffe4e6",
            primary50: "#ffcacd",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
