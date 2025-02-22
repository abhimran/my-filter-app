// src/components/Condition.tsx
import React from "react";
import { Condition } from "../utils/types";
import CustomSelect from "./CustomSelect";
import CustomMultiSelect from "./CustomMultiSelect";
import { sanitizeInput } from "../utils/sanitize";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ConditionProps {
  condition: Condition;
  onUpdate: (updated: Condition) => void;
  onDelete: () => void;
}

const ConditionComponent: React.FC<ConditionProps> = ({
  condition,
  onUpdate,
  onDelete,
}) => {
  const handleFieldChange = (field: string) => {
    onUpdate({ ...condition, field });
  };

  const handleOperatorChange = (operator: string) => {
    let newValue = condition.value;
    if (operator === "is any of" && !Array.isArray(newValue)) {
      newValue = [];
    }
    onUpdate({ ...condition, operator, value: newValue });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...condition, value: sanitizeInput(e.target.value) });
  };

  const handleSingleSelectChange = (val: string) => {
    onUpdate({ ...condition, value: val });
  };

  const handleMultiSelectChange = (vals: string[]) => {
    onUpdate({ ...condition, value: vals });
  };

  // Decide how to render the value field
  let valueControl: React.ReactNode = null;

  if (
    condition.field === "Forecast Category" &&
    condition.operator === "is any of"
  ) {
    const arrValue = Array.isArray(condition.value) ? condition.value : [];
    valueControl = (
      <CustomMultiSelect
        options={[
          "Omitted",
          "Pipeline",
          "Best case",
          "Most likely",
          "Commit",
          "Closed",
        ]}
        values={arrValue}
        onChange={handleMultiSelectChange}
        placeholder="Select categories"
      />
    );
  } else if (condition.field === "Forecast Category") {
    // Single select
    valueControl = (
      <CustomSelect
        options={[
          "Omitted",
          "Pipeline",
          "Best case",
          "Most likely",
          "Commit",
          "Closed",
        ]}
        value={typeof condition.value === "string" ? condition.value : ""}
        onChange={handleSingleSelectChange}
        placeholder="Select one..."
      />
    );
  } else {
    // Fallback to text input
    valueControl = (
      <input
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 w-44"
        value={condition.value.toString()}
        onChange={handleValueChange}
        placeholder="Value"
      />
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
      {/* Field */}
      <CustomSelect
        options={["Forecast Category", "Stage", "OHS", "Opportunity owner"]}
        value={condition.field}
        onChange={handleFieldChange}
        placeholder="Field"
        className="w-52"
      />

      {/* Operator */}
      <CustomSelect
        options={["is", "is any of", "is more", "is less", "contains"]}
        value={condition.operator}
        onChange={handleOperatorChange}
        placeholder="Operator"
        className="w-36"
      />

      {/* Value Control */}
      {valueControl}

      {/* Delete Icon */}
      <span className="text-red-400 hover:text-red-600 cursor-pointer">
        <RiDeleteBin6Line onClick={onDelete} size={22} />
      </span>
    </div>
  );
};

export default ConditionComponent;
