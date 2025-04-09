import PageBlock from "../../../@manush/components/PageBlock/PageBlock.jsx";
import { Typography } from "@mui/material";
import AddButton from "../../../@manush/elements/button/AddButton/AddButton.jsx";
import { useCallback, useMemo, useState } from "react";
import useDataTableFetchData from "../../../@manush/hooks/useDataTableFetchData.js";
import DataTable from "../../../@manush/components/DataTable/DataTable.jsx";
import { apiRoutes } from "../../../@manush/common/api-routes.js";
import { formatDate, rowStatusCell } from "../../../utilities/healper.jsx";
import DatatableButtonGroup from "../../../@manush/components/DataTable/Button/DatatableButtonGroup.jsx";
import DatatableReadButton from "../../../@manush/components/DataTable/Button/DatatableReadButton.jsx";
import DatatableEditButton from "../../../@manush/components/DataTable/Button/DatatableEditButton.jsx";
import DatatableDeleteButton from "../../../@manush/components/DataTable/Button/DatatableDeleteButton.jsx";
import {
  deleteProduct,
  updateProductStatus,
} from "../../../services/productsManagement/productService.js";
import useNotiStack from "../../../@manush/hooks/useNotifyStack.js";
import OrderAddEditPopup from "./OrderAddEditPopup.jsx";
import OrderDetailsPopup from "./OrderDetailsPopup.jsx";

const OrdersPage = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const { successStack, errorStack } = useNotiStack();

  const {
    onFetchData,
    data: products,
    loading,
    totalCount,
    refresh: mutateProduct,
  } = useDataTableFetchData({
    urlPath: apiRoutes.product.PRODUCT_CA,
  });

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback((itemId) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const handleUpdateStatus = async (itemId, row_status) => {
    try {
      await updateProductStatus(itemId, { row_status: row_status ? 1 : 0 });
      successStack("Order status updated successfully", "success");
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteProduct(itemId);
      successStack("Order deleted successfully", "success");
      await mutateProduct();
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },

      {
        id: "price",
        accessorKey: "price",
        header: "Price",
      },
      {
        id: "weight",
        accessorKey: "weight",
        header: "Weight",
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
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: "Updated at",
        cell: (props) => {
          let data = props.row.original;
          return formatDate(data?.updatedAt);
        },
      },
      {
        id: "row_status",
        header: "Publish",
        cell: rowStatusCell(handleUpdateStatus),
      },
      {
        id: "action",
        header: "Actions",
        cell: (props) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <DatatableReadButton onClick={() => openDetailsModal(data.id)} />
              <DatatableEditButton onClick={() => openAddEditModal(data.id)} />
              <DatatableDeleteButton
                deleteAction={() => handleDelete(data.id)}
              />
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [openAddEditModal, openDetailsModal, products],
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
      extra={[
        <AddButton
          key={1}
          tooltip={"Add Order"}
          text={"Add Order"}
          onClick={() => openAddEditModal(null)}
        />,
      ]}
    >
      <DataTable
        columns={columns}
        tableData={products}
        fetchData={onFetchData}
        loading={loading}
        totalCount={totalCount}
      />
      {isOpenAddEditModal && (
        <OrderAddEditPopup
          key={1}
          onClose={closeAddEditModal}
          itemId={selectedItemId}
          refreshDataTable={mutateProduct}
        />
      )}
      {isOpenDetailsModal && (
        <OrderDetailsPopup
          key={1}
          itemId={selectedItemId}
          onClose={closeDetailsModal}
          openEditModal={openAddEditModal}
        />
      )}
    </PageBlock>
  );
};

export default OrdersPage;
