import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTableFilterMeta } from "primereact/datatable";

export const headersList = [
  {
    id: 1,
    name: "Date",
    field: "date",
    dataType: "",
    filter: false,
    sortable: true,
  },
  {
    id: 2,
    name: "Hole depth (m)",
    field: "hole_depth",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 3,
    name: "Block Position (m)",
    field: "block_position",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 4,
    name: "ROP Instant (m/hr)",
    field: "rop_instant",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 5,
    name: "Bit Depth (m)",
    field: "bit_depth",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 6,
    name: "Hook Load (tn)",
    field: "hook_load",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 7,
    name: "Weight on bit (tn)",
    field: "weight_on_bit",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 8,
    name: "SPP (atm)",
    field: "spp",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 9,
    name: "Flow rate In (lps)",
    field: "flow_rate_in",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 10,
    name: "Flow rate Out (lps)",
    field: "flow_rate_out",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 11,
    name: "SPM 1",
    field: "spm_1",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 12,
    name: "SPM 2",
    field: "spm_2",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 13,
    name: "Rotor RPM",
    field: "rotor_rpm",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 14,
    name: "Rotor table torque (kNm)",
    field: "rotor_table_torque",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 15,
    name: "SPM 3",
    field: "spm_3",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 16,
    name: "SPM 4",
    field: "spm_4",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 17,
    name: "ROP Avg (m/hr)",
    field: "rop_avg",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 18,
    name: "Density Mud In (sg)",
    field: "density_mud_in",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
  {
    id: 19,
    name: "Density Mud Out (sg)",
    field: "density_mud_out",
    dataType: "numeric",
    filter: true,
    sortable: true,
  },
];

export const defaultFilters: DataTableFilterMeta = {
  //hole_depth: { value: "", matchMode: "contains" },
  hole_depth: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  block_position: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  rop_instant: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  bit_depth: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  hook_load: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  weight_on_bit: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  spp: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  flow_rate_in: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  flow_rate_out: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  spm_1: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  spm_2: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  rotor_rpm: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  rotor_table_torque: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  spm_3: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  spm_4: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  rop_avg: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  density_mud_in: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  density_mud_out: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
};
export type ColumnType = {
  id: number;
  name: string;
  sortable: boolean;
  filter: boolean;
};
