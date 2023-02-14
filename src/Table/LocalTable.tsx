import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Person } from "../makeData";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender, RowData, ColumnFiltersState, ColumnFilter
} from "@tanstack/react-table";
import TablePaginationActions from "./TablePaginationActions";
import TableHead from "./TableHead";
import {FilterComponentProps} from "./Filter";
import {CSSProperties, useState} from "react";
import {SxProps} from "@mui/material";

declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends RowData> {
        filterPlaceholder?: string;
        filterComponent?: (props: FilterComponentProps) => JSX.Element;
        cell?: {
            className?: string;
            style?: CSSProperties;
            sx?: SxProps;
        };
        header?: {
            className?: string;
            style?: CSSProperties;
            sx?: SxProps;
        };
    }

    interface TableMeta<TData extends RowData> {
        //  👇 All Column Filter
        tempColumnFilters: ColumnFiltersState;
        setTempColumnFilters: (params: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => void;
        //  👇 Single/column filter
        setTempFilterValue: (columnFilter: ColumnFilter) => void;
        getTempFilterValue: (columnId: ColumnFilter['id']) => unknown;
    }
}

export default function LocalTable({
                                       data,
                                       columns
                                   }: {
    data: Person[];
    columns: ColumnDef<Person>[];
}) {
    const [tempColumnFilters, setTempColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
        debugTable: true,
        meta: {
            tempColumnFilters,
            setTempColumnFilters,
            setTempFilterValue: ({id: columnId, value}) => {
                   setTempColumnFilters(old => {
                       const filterIndex = old.findIndex((item) => item.id === columnId);

                       if(filterIndex === -1) {
                           return [
                               ...old,
                               {id: columnId, value}
                           ]
                       }

                       return old.map((item, index) => {
                           if(index === filterIndex) {
                               return {id: columnId, value}
                           }

                           return item
                       })
                   })
            },
            getTempFilterValue: (columnId) => {
                return tempColumnFilters.find(item => item.id === columnId)?.value
            }
        }
    });

    const { pageSize, pageIndex } = table.getState().pagination;

    return (
        <Box sx={{ width: "100%" }}>
            <TableContainer component={Paper}>
                <TableHead table={table} />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length }]}
                component="div"
                count={table.getFilteredRowModel().rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                }}
                onPageChange={(_, page) => {
                    table.setPageIndex(page);
                }}
                onRowsPerPageChange={(e) => {
                    const size = e.target.value ? Number(e.target.value) : 10;
                    table.setPageSize(size);
                }}
                ActionsComponent={TablePaginationActions}
            />
            <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
        </Box>
    );
}
