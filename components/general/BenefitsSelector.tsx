import { benefits } from "@/app/utils/listOfBenefit";
import { Badge } from "../ui/badge";
import { ControllerRenderProps } from "react-hook-form";

interface BenefitsSelectorProps {
  field: ControllerRenderProps;
}

export function BenefitsSelector({ field }: BenefitsSelectorProps) {
  function toggleBenefit(benefitId: string) {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  }

  return (
    <div className="">
      <div className="flex flex-wrap gap-3 ">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);

          return (
            <Badge
              className="cursor-pointer transition-all hover:scale-105 hover:text-primary active:scale-95 text-sm px-4 py-1.5 hover:border-primary"
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => toggleBenefit(benefit.id)}
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Selected Benefit(s) :{" "}
        <span className="text-primary font-semibold">
          {(field.value || []).length}
        </span>
      </div>
    </div>
  );
}
