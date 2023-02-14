import { Table as ReactTable } from "@tanstack/react-table";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    Button,
    SwipeableDrawer,
    Unstable_Grid2 as Grid2
} from "@mui/material";
import Filter from "../Table/Filter";
import {useEffect} from "react";

const ModalFilter = NiceModal.create(function ModalFilter({
                                                              table
                                                          }: {
    table: ReactTable<any>;
}) {
    const modal = useModal();
    const headerGroups = table.getHeaderGroups();

    useEffect(() => {
        if(modal.visible) {
            table.options.meta?.setTempColumnFilters([]);
        }
    }, []);

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={modal.visible}
            onClose={modal.hide}
            onOpen={modal.hide}
        >
            <Grid2 container>
                {headerGroups.map((headerGroup) => {
                    return headerGroup.headers.map((header) => {
                        if (header.column.getCanFilter()) {
                            return (
                                <Grid2 key={header.id}>
                                    {header.column.columnDef.meta?.filterComponent ? (
                                        <header.column.columnDef.meta.filterComponent
                                            table={table}
                                            column={header.column}
                                            placeholder={
                                                typeof header.column.columnDef.header === "string"
                                                    ? header.column.columnDef.header
                                                    : "-"
                                            }
                                        />
                                    ) : (
                                        <Filter
                                            table={table}
                                            column={header.column}
                                            placeholder={
                                                typeof header.column.columnDef.header === "string"
                                                    ? header.column.columnDef.header
                                                    : "-"
                                            }
                                        />
                                    )}
                                </Grid2>
                            );
                        }

                        return null;
                    });
                })}
            </Grid2>

            <Button
                variant="contained"
                fullWidth
                onClick={() => {
                    table.setColumnFilters(table.options.meta?.tempColumnFilters ?? []);
                    void modal.hide();
                }}
            >
                Apply
            </Button>
        </SwipeableDrawer>
    );
});

export default ModalFilter;
