import InputBase from "@mui/material/InputBase";

import { Column, Table as ReactTable } from "@tanstack/react-table";
import {useEffect} from "react";

export type FilterComponentProps = {
    column: Column<any, any>;
    placeholder: string;
    table: ReactTable<any>
};

export default function Filter({ column, placeholder, table }: FilterComponentProps) {
    const columnFilterValue = column.getFilterValue();
    const tempColumnFilterValue = table.options.meta?.getTempFilterValue(column.id);

    useEffect(() => {
        table.options.meta?.setTempFilterValue({id: column.id, value: columnFilterValue});
    }, []);

    return (
        <InputBase
            value={tempColumnFilterValue}
            onChange={(e) => {
                const {value} = e.target;
                table.options.meta?.setTempFilterValue({id: column.id, value});
            }}
            placeholder={placeholder}
            className="w-36 border shadow rounded"
            inputProps={{ "aria-label": "search" }}
        />
    );
}
