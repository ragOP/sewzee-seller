import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { memo, useEffect, useState } from "react";

// local imports
import "./Table.css";

// Options for the table
const options = {
    filterType: "checkbox",
};

const Table = ({ tableData, tableHeader, tableTitle, handleDelete }) => {
    const [extendedTableHeader, setExtendedTableHeader] = useState([]);

    // injecting fullData in tableMeta
    useEffect(() => {
        if (tableData?.length > 0) {
            const extendedTableHeader = tableHeader.map((column) => {
                if (column.options && column.options.customBodyRender) {
                    const originalCustomBodyRender =
                        column.options.customBodyRender;
                    column.options.customBodyRender = (value, tableMeta) => {
                        const extendedTableMeta = {
                            ...tableMeta,
                            fullData: tableData,
                        };
                        return originalCustomBodyRender(
                            value,
                            extendedTableMeta
                        );
                    };
                }
                return column;
            });
            setExtendedTableHeader(extendedTableHeader);
        }
    }, [tableData]);

    return (
        <Box>
            <MUIDataTable
                title={tableTitle}
                data={tableData}
                columns={extendedTableHeader}
                options={{ ...options, onRowsDelete: handleDelete }}
            />
        </Box>
    );
};

export const EnhancedTable = memo(Table);
