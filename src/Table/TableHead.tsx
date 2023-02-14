import { Table as ReactTable } from "@tanstack/react-table";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Box } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import ModalFilter from "../Modal/ModalFilter";

export default function TableHead({ table }: { table: ReactTable<any> }) {
    return (
        <Box>
            <Grid2 container>
                <Grid2>
                    <Button
                        variant="contained"
                        sx={{ mr: 1 }}
                        onClick={() => {
                            void NiceModal.show('modal-filter');

                            // Don't use like this, this isn't rerender and don't get new value
                            // void NiceModal.show(ModalFilter, {table});
                        }}
                    >
                        Filter
                    </Button>
                    <ModalFilter table={table} id='modal-filter' />
                </Grid2>

                <Grid2>
                    <Button variant="contained">Sort</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}
