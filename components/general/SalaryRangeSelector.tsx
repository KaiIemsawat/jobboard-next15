import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface iAppProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  // currency: string;
}

export function SalaryRangeSelector({
  control,
  maxSalary,
  minSalary,
  step,
}: iAppProps) {
  const { field: FormField } = useController({
    name: "salaryFrom",
    control,
  });

  const { field: toField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    FormField.value || minSalary * 2.3,
    toField.value || maxSalary / 1.5,
  ]);

  function handleChangeRange(value: number[]) {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    FormField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  }

  return (
    <div className="w-full space-y-4">
      <Slider
        onValueChange={handleChangeRange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className="flex justify-between">
        <span className="">{formatCurrency(range[0])}</span>
        <span className="">{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
}
