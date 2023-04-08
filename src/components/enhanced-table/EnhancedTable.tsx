import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { getComparator, isUpperCase, Order, stableSort } from "./utils";
import { EnhancedTableProps, ITableRow, TableProps } from "./models";
import { SearchRounded } from "@mui/icons-material";

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "test";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const { headCells, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            // @ts-ignore
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function createTableCell(value: string | number | string[]) {
  return (
    <TableCell align="left">
      {typeof value !== "number" &&
      value?.length === 2 &&
      isUpperCase(value.toString()) ? (
        <FlagIcon height={18} code={value as FlagIconCode} />
      ) : Array.isArray(value) && value.every(() => true) ? (
        value.map((v) => (
          <a
            target="_blank"
            style={{ display: "block" }}
            href={v}
            rel="noreferrer"
          >
            {v}
          </a>
        ))
      ) : (
        value
      )}
    </TableCell>
  );
}

export default function EnhancedTable<T>(props: TableProps<T>) {
  const { headCells, data, handleOnClick, handleFilter, isLoading } = props;
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  // @ts-ignore
  const [orderBy, setOrderBy] = useState<string>(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<ITableRow[]>();
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    let rowsOnMount = stableSort(
      // @ts-ignore
      data,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );
    rowsOnMount = rowsOnMount.slice(0, DEFAULT_ROWS_PER_PAGE);

    // @ts-ignore
    setVisibleRows(rowsOnMount);
  }, [data]);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: string) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        // @ts-ignore
        data,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [data, order, orderBy, page, rowsPerPage]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      // @ts-ignore
      const sortedRows = stableSort(data, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [data, order, orderBy, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      // @ts-ignore
      const sortedRows = stableSort(data, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(0, updatedRowsPerPage);
      setVisibleRows(updatedRows);
    },
    [data, order, orderBy]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        className="searchInput"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        label="Search"
        onChange={(event) => handleFilter(event.target.value)}
      />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer className="table">
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              // @ts-ignore
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {isLoading ? (
                <CircularProgress size={50} />
              ) : !visibleRows || visibleRows.length === 0 ? (
                <TableRow>
                  <TableCell>No results found.</TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row: ITableRow, index: number) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleOnClick?.(row)}
                      sx={{ cursor: handleOnClick ? "pointer" : "" }}
                    >
                      {Object.entries(row)
                        .sort()
                        .map(([key, value]) => {
                          return createTableCell(value);
                        })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
