export interface Condition {
  field: string;
  operator: string;
  value: string | number | string[];
}

export interface FilterGroup {
  logic: "AND" | "OR";
  conditions: Condition[];
  subgroups: FilterGroup[];
}

export interface ExtraCondition {
  logic: "AND" | "OR";
  condition: Condition;
}

export interface FilterState {
  mainCondition: Condition;
  groups: FilterGroup[];
  extraConditions: ExtraCondition[];
}
