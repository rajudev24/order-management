import PageBlock from "../../../@manush/components/PageBlock/PageBlock.jsx";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import useDataTableFetchData from "../../../@manush/hooks/useDataTableFetchData.js";
import DataTable from "../../../@manush/components/DataTable/DataTable.jsx";
import { apiRoutes } from "../../../@manush/common/api-routes.js";
import { formatDate } from "../../../utilities/healper.jsx";

const OrdersPage = () => {
  const {
    onFetchData,
    data: products,
    loading,
    totalCount,
  } = useDataTableFetchData({
    urlPath: apiRoutes.orders.ORDERED_PRODUCTS,
  });

  const columns = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "order.user.name",
        header: "Customer Name",
      },
      {
        id: "email",
        accessorKey: "order.user.email",
        header: "Customer Email",
      },

      {
        id: "product_name",
        accessorKey: "product.name",
        header: "Product Name",
      },
      {
        id: "price",
        accessorKey: "price",
        header: "Price",
      },
      {
        id: "discount",
        accessorKey: "discount",
        header: "Discount",
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Ordered Quantity",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created at",
        cell: (props) => {
          let data = props.row.original;
          return formatDate(data?.createdAt);
        },
      },
    ],
    [products],
  );

  return (
    <PageBlock
      title={
        <>
          <Typography variant="h5" component="h3">
            Orders
          </Typography>
        </>
      }
    >
      <DataTable
        columns={columns}
        tableData={products}
        fetchData={onFetchData}
        loading={loading}
        totalCount={totalCount}
      />
    </PageBlock>
  );
};

export default OrdersPage;
