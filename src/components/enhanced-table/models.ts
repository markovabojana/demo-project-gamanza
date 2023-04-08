import * as React from "react";
import { Order } from "./utils";

export interface HeadCell<T> {
  id: keyof T;
  label: string;
}

export interface EnhancedTableProps<T> {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof T
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
}

interface IHandleCountryClick {
  (row: ITableRow): void;
}

interface IHandleFilter {
  (searchText: string): void;
}

export interface TableProps<T> {
  headCells: HeadCell<T>[];
  data: T[];
  handleOnClick?: IHandleCountryClick;
  handleFilter: IHandleFilter;
  isLoading: boolean;
}

export interface ITableRow {
  [key: string]: string | number | string[];
}
