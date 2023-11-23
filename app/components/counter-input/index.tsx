import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ICounterInputProps {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
}
const CounterInput = ({
  title,
  subTitle,
  value,
  onChange,
}: ICounterInputProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          disabled={value === 1}
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600 select-none">
          {value}
        </div>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default CounterInput;
