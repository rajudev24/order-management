import React, { useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Pagination,
  Grid,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";

const pageSizes = [10, 20, 30, 40, 50];

const DataTable = ({
  columns,
  tableData: data,
  fetchData,
  loading,
  paginate = true,
  totalCount = data ? data.length : 0,
}) => {
  const [datatableData, setDatatableData] = useState(data || []);
  const [isDatatableLoading, setIsDatatableLoading] = useState(true);

  const table = useReactTable({
    data: datatableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!fetchData,
    pageCount: fetchData ? Math.ceil(totalCount / 10) : undefined,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    setDatatableData(data);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDatatableLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading !== undefined) {
      setIsDatatableLoading(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (fetchData) {
      const { pageIndex, pageSize } = table.getState().pagination;
      fetchData({
        pageIndex,
        pageSize,
      });
    }
  }, [table.getState().pagination]);

  const { pageIndex, pageSize } = table.getState().pagination;

  const handleChangePage = (event, newPage) => {
    table.setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    table.setPageSize(parseInt(event.target.value));
    table.setPageIndex(0);
  };

  if (isDatatableLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <MuiTable sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      width: `${100 / headerGroup.headers.length}%`,
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    ) || null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{ width: `${100 / row.getVisibleCells().length}%` }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    ) || null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {paginate && datatableData.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            width: "100%",
          }}
        >
          <TablePagination
            component="div"
            rowsPerPageOptions={pageSizes}
            count={fetchData ? totalCount : datatableData.length}
            rowsPerPage={pageSize}
            page={pageIndex}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ width: "50%" }}
          />
          <Pagination
            count={
              fetchData
                ? Math.ceil(totalCount / pageSize)
                : Math.ceil(datatableData.length / pageSize)
            }
            page={pageIndex + 1}
            onChange={(event, page) => table.setPageIndex(page - 1)}
          />
        </Box>
      )}
    </Box>
  );
};

export default DataTable;
