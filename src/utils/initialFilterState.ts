// utils/initialFilterState.ts
import { FilterState } from "./types";

export const initialFilterState: FilterState = {
  mainCondition: {
    field: "Forecast Category",
    operator: "is any of",
    value: ["Omitted"],
  },
  groups: [
    {
      logic: "AND",
      conditions: [{ field: "Opportunity owner", operator: "is", value: "" }],
      subgroups: [],
    },
  ],
  extraConditions: [
    {
      logic: "AND",
      condition: {
        field: "",
        operator: "",
        value: "",
      },
    },
  ],
};
