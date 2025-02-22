import { ExtraCondition, Condition } from "../utils/types";
import ConditionComponent from "./ConditionComponent";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  extraCond: ExtraCondition;
  onUpdate: (updated: ExtraCondition) => void;
  onDelete: () => void;
}

function ExtraConditionComponent({ extraCond, onUpdate, onDelete }: Props) {
  const handleLogicChange = (logic: "AND" | "OR") => {
    onUpdate({ ...extraCond, logic });
  };

  const handleConditionUpdate = (updatedCond: Condition) => {
    onUpdate({ ...extraCond, condition: updatedCond });
  };

  return (
    <div className="pl-4 mb-4">
      <div className="flex item-center gap-2 justify-center">
        <div className="flex items-center gap-2 mb-2">
          {/* AND/OR dropdown */}
          <select
            className="border border-gray-300 rounded px-2 py-2"
            value={extraCond.logic}
            onChange={(e) => handleLogicChange(e.target.value as "AND" | "OR")}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        {/* Single condition in a gray box */}
        <div className="">
          <ConditionComponent
            condition={extraCond.condition}
            onUpdate={handleConditionUpdate}
            hideDeleteIcon
          />
        </div>

        <div className="mt-2">
          <span
            className="text-red-400 hover:text-red-600 cursor-pointer"
            onClick={onDelete}
          >
            <RiDeleteBin6Line size={22} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExtraConditionComponent;
