
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { memo, useState } from "react";

// local imports
import "./Table.css";

// Options for the table
const options = {
    filterType: 'checkbox',
};


const Table = ({ tableData, tableHeader, tableTitle, handleDelete }) => {




    return (
        <Box>
            <MUIDataTable
                title={tableTitle}
                data={tableData}
                columns={tableHeader}
                options={{ ...options, onRowsDelete: handleDelete }}
            />
        </Box>
    );
};

export const EnhancedTable = memo(Table);