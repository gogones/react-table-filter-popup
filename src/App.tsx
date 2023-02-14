import {useMemo, useReducer, useState} from 'react'
import './App.css'
import {Box, Container} from "@mui/material";
import LocalTable from "./Table/LocalTable";
import {makeData, Person} from "./makeData";
import {ColumnDef} from "@tanstack/react-table";

function App() {
    const rerender = useReducer(() => ({}), {})[1];

    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                header: "Name",
                footer: (props) => props.column.id,
                columns: [
                    {
                        accessorKey: "firstName",
                        cell: (info) => info.getValue(),
                        footer: (props) => props.column.id,
                        header: "First Name"
                    },
                    {
                        accessorFn: (row) => row.lastName,
                        id: "lastName",
                        cell: (info) => info.getValue(),
                        header: "Last Name",
                        footer: (props) => props.column.id
                    }
                ]
            },
            {
                header: "Info",
                footer: (props) => props.column.id,
                columns: [
                    {
                        accessorKey: "age",
                        header: "Age",
                        footer: (props) => props.column.id
                    },
                    {
                        header: "More Info",
                        columns: [
                            {
                                accessorKey: "visits",
                                header: "Visits",
                                footer: (props) => props.column.id
                            },
                            {
                                accessorKey: "status",
                                header: "Status",
                                footer: (props) => props.column.id
                            },
                            {
                                accessorKey: "progress",
                                header: "Profile Progress",
                                footer: (props) => props.column.id
                            }
                        ]
                    }
                ]
            }
        ],
        []
    );

    const [data, setData] = useState(() => makeData(100));
    const refreshData = () => setData(() => makeData(100));

    return (
                <Container maxWidth="sm">
                    <Box sx={{ my: 4 }}>
                        <LocalTable data={data} columns={columns} />
                    </Box>
                <hr />
                <div>
                    <button onClick={() => rerender()}>Force Rerender</button>
                </div>

                <div>
                    <button onClick={() => refreshData()}>Refresh Data</button>
                </div>
                </Container>
    );
}

export default App
