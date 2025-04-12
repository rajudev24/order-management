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
import { deleteProduct } from "../../../services/productsManagement/productService.js";
import useNotiStack from "../../../@manush/hooks/useNotifyStack.js";
import PromotionDetailsPopup from "./PromotionDetailsPopup.jsx";
import PromotionAddEditPopup from "./PromotionAddEditPopup.jsx";
import { updatePromotionStatus } from "../../../services/promotionManagement/promotionService.js";

const PromotionsPage = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const { successStack, errorStack } = useNotiStack();

  const {
    onFetchData,
    data: promotions,
    loading,
    totalCount,
    refresh: mutatePromotion,
  } = useDataTableFetchData({
    urlPath: apiRoutes.promotion.PROMOTION_CA,
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
      await updatePromotionStatus(itemId, { row_status: row_status ? 1 : 0 });
      successStack("Promotion status updated Successfully", "success");
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteProduct(itemId);
      successStack("Promotion Deleted Successfully", "success");
      await mutatePromotion();
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },

      {
        id: "discount_type",
        accessorKey: "discount_type",
        header: "Discount Type",
      },
      {
        id: "discount_value",
        accessorKey: "discount_value",
        header: "Discount Value",
      },
      {
        id: "start_date",
        accessorKey: "start_date",
        header: "Start Date",
        cell: (props) => {
          let data = props.row.original;
          return formatDate(data?.start_date);
        },
      },
      {
        id: "end_date",
        accessorKey: "end_date",
        header: "End Date",
        cell: (props) => {
          let data = props.row.original;
          return formatDate(data?.end_date);
        },
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
    [openAddEditModal, openDetailsModal, promotions],
  );

  return (
    <PageBlock
      title={
        <>
          <Typography variant="h5" component="h3">
            Promotions
          </Typography>
        </>
      }
      extra={[
        <AddButton
          key={1}
          tooltip={"Add Promotion"}
          text={"Add Promotion"}
          onClick={() => openAddEditModal(null)}
        />,
      ]}
    >
      <DataTable
        columns={columns}
        tableData={promotions}
        fetchData={onFetchData}
        loading={loading}
        totalCount={totalCount}
      />
      {isOpenAddEditModal && (
        <PromotionAddEditPopup
          key={1}
          onClose={closeAddEditModal}
          itemId={selectedItemId}
          refreshDataTable={mutatePromotion}
        />
      )}
      {isOpenDetailsModal && (
        <PromotionDetailsPopup
          key={1}
          itemId={selectedItemId}
          onClose={closeDetailsModal}
          openEditModal={openAddEditModal}
        />
      )}
    </PageBlock>
  );
};

export default PromotionsPage;
