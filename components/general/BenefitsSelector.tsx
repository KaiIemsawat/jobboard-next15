import { benefits } from "@/app/utils/listOfBenefit";
import { Badge } from "../ui/badge";
import { ControllerRenderProps } from "react-hook-form";

interface iAppProps {
  field: ControllerRenderProps;
}

export function BenefitsSelector({ field }: iAppProps) {
  function toggleBenefit() {
    const currentBenefits = field.value || [];
  }
  return (
    <div className="">
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => (
          <Badge
            className="cursor-pointer transition-all hover:scale-105 hover:text-primary active:scale-95 text-sm px-4 py-1.5 hover:border-primary"
            key={benefit.id}
            variant="outline"
          >
            <span className="flex items-center gap-2">
              {benefit.icon}
              {benefit.label}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
