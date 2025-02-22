import { FilterGroup, Condition } from "../utils/types";
import ConditionComponent from "./ConditionComponent";
import { RiDeleteBin6Line } from "react-icons/ri";

interface GroupProps {
  group: FilterGroup;
  onUpdate: (updated: FilterGroup) => void;
  onDelete?: () => void;
  isTopLevel?: boolean;
}

function GroupComponent({ group, onUpdate, onDelete, isTopLevel }: GroupProps) {
  // Change logic
  const handleLogicChange = (logic: "AND" | "OR") => {
    onUpdate({ ...group, logic });
  };

  // Add condition
  const addCondition = () => {
    const newCond: Condition = { field: "", operator: "", value: "" };
    onUpdate({ ...group, conditions: [newCond, ...group.conditions] });
  };

  // Update condition
  const updateCondition = (index: number, updatedCond: Condition) => {
    const newConds = [...group.conditions];
    newConds[index] = updatedCond;
    onUpdate({ ...group, conditions: newConds });
  };

  // Delete condition
  const deleteCondition = (index: number) => {
    const newConds = [...group.conditions];
    newConds.splice(index, 1);
    onUpdate({ ...group, conditions: newConds });
  };

  // Add subgroup
  const addSubgroup = () => {
    const newGroup: FilterGroup = {
      logic: "AND",
      conditions: [],
      subgroups: [],
    };
    onUpdate({ ...group, subgroups: [newGroup, ...group.subgroups] });
  };

  // Update subgroup
  const updateSubgroup = (index: number, updated: FilterGroup) => {
    const newSubs = [...group.subgroups];
    newSubs[index] = updated;
    onUpdate({ ...group, subgroups: newSubs });
  };

  // Delete subgroup
  const deleteSubgroup = (index: number) => {
    const newSubs = [...group.subgroups];
    newSubs.splice(index, 1);
    onUpdate({ ...group, subgroups: newSubs });
  };

  return (
    <div className="border-l-4 border-gray-200 pl-4 mb-4">
      {/* Logic dropdown + (optional) group delete */}
      <div className="d-flex gap-2 items-start">
        <div className="flex items-center gap-2 mb-2">
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={group.logic}
            onChange={(e) => handleLogicChange(e.target.value as "AND" | "OR")}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>

          {/* Hide trash if top-level */}
          {!isTopLevel && onDelete && (
            <span
              className="text-red-400 hover:text-red-600 cursor-pointer"
              onClick={onDelete}
            >
              <RiDeleteBin6Line size={22} />
            </span>
          )}
        </div>

        {/* Conditions + subgroups in a gray box */}
        <div className="bg-gray-100 p-4 rounded-md">
          {group.conditions.map((cond, idx) => (
            <ConditionComponent
              key={idx}
              condition={cond}
              onUpdate={(updated) => updateCondition(idx, updated)}
              onDelete={() => deleteCondition(idx)}
            />
          ))}

          {group.subgroups.map((sub, idx) => (
            <div className="bg-gray-200 p-4 rounded-md mt-2">
              <GroupComponent
                key={idx}
                group={sub}
                onUpdate={(updated) => updateSubgroup(idx, updated)}
                onDelete={() => deleteSubgroup(idx)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons to add condition or subgroup */}
      <div className="flex items-center gap-4 mt-2">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={addCondition}
        >
          + Add condition
        </button>
        <button
          className="text-purple-600 hover:text-purple-800"
          onClick={addSubgroup}
        >
          + Add subgroup
        </button>
      </div>
    </div>
  );
}

export default GroupComponent;
