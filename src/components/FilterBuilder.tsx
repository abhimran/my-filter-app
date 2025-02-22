import { useState } from "react";
import {
  FilterState,
  FilterGroup,
  Condition,
  ExtraCondition,
} from "../utils/types";
import { initialFilterState } from "../utils/initialFilterState";
import GroupComponent from "./GroupComponent";
import ExtraConditionComponent from "./ExtraConditionComponent";
import ConditionComponent from "./ConditionComponent";
import { BsPlus } from "react-icons/bs";

function FilterBuilder() {
  const [filterState, setFilterState] =
    useState<FilterState>(initialFilterState);
  const [matchingRecords, setMatchingRecords] = useState<number>(33);

  // When attribute changes, reset all state to initial
  const handleAttributeChange = () => {
    setFilterState({ ...initialFilterState });
  };

  // Update main condition (row #1)
  const updateMainCondition = (updated: Condition) => {
    setFilterState((prev) => ({ ...prev, mainCondition: updated }));
  };

  const addGroup = () => {
    const newGroup: FilterGroup = {
      logic: "AND",
      conditions: [{ field: "", operator: "", value: "" }],
      subgroups: [],
    };
    setFilterState((prev) => ({
      ...prev,
      groups: [...prev.groups, newGroup],
    }));
  };

  const updateGroup = (index: number, updated: FilterGroup) => {
    const newGroups = [...filterState.groups];
    newGroups[index] = updated;
    setFilterState({ ...filterState, groups: newGroups });
  };

  const deleteGroup = (index: number) => {
    const newGroups = [...filterState.groups];
    newGroups.splice(index, 1);
    setFilterState({ ...filterState, groups: newGroups });
  };

  const addExtraCondition = () => {
    const newExtra: ExtraCondition = {
      logic: "AND",
      condition: { field: "", operator: "", value: "" },
    };
    setFilterState((prev) => ({
      ...prev,
      extraConditions: [...prev.extraConditions, newExtra],
    }));
  };

  const updateExtraCondition = (index: number, updated: ExtraCondition) => {
    const newExtras = [...filterState.extraConditions];
    newExtras[index] = updated;
    setFilterState({ ...filterState, extraConditions: newExtras });
  };

  const deleteExtraCondition = (index: number) => {
    const newExtras = [...filterState.extraConditions];
    newExtras.splice(index, 1);
    setFilterState({ ...filterState, extraConditions: newExtras });
  };

  const applyFilters = () => {
    // dummy
    setMatchingRecords(Math.floor(Math.random() * 100));
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-6xl mx-auto">
      {/* Top bar: Attribute */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-gray-700 font-medium">Attribute:</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1"
          value="My Opportunities"
          onChange={handleAttributeChange}
        >
          <option value="My Opportunities">My Opportunities</option>
          <option value="All Opportunities">All Opportunities</option>
        </select>
      </div>

      <div className="h-[1px] w-full bg-gray-200"></div>

      {/* Salesforce fields header and matching record count */}
      <div className="flex items-center justify-between mt-2 mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Salesforce fields
        </h2>
        <div className="text-gray-600">
          {matchingRecords} matching record(s)
        </div>
      </div>

      {/* 1) Main condition row  */}
      <div className="mb-4">
        <span className="font-semibold mr-2 mt-4 mb-4">Where</span>
        <ConditionComponent
          condition={filterState.mainCondition}
          onUpdate={updateMainCondition}
          hideDeleteIcon
        />
      </div>

      {/* 2) Render top-level groups */}
      {filterState.groups.map((grp, idx) => (
        <GroupComponent
          key={idx}
          group={grp}
          onUpdate={(updated) => updateGroup(idx, updated)}
          onDelete={() => deleteGroup(idx)}
          isTopLevel
        />
      ))}

      {/* 3) Render extra conditions */}
      {filterState.extraConditions.map((ex, idx) => (
        <ExtraConditionComponent
          key={idx}
          extraCond={ex}
          onUpdate={(updated) => updateExtraCondition(idx, updated)}
          onDelete={() => deleteExtraCondition(idx)}
        />
      ))}

      {/* Buttons */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            onClick={addExtraCondition}
          >
            <BsPlus size={24} />
            Add condition
          </button>
          <button
            className="text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
            onClick={addGroup}
          >
            <BsPlus size={24} />
            Add group
          </button>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterBuilder;
