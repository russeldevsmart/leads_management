// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/leadsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "../LeadsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useLeadsUIContext } from "../LeadsUIContext";

export function LeadsTable() {
  // Leads UI Context
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      ids: leadsUIContext.ids,
      setIds: leadsUIContext.setIds,
      queryParams: leadsUIContext.queryParams,
      setQueryParams: leadsUIContext.setQueryParams,
      openEditLeadDialog: leadsUIContext.openEditLeadDialog,
      openDeleteLeadDialog: leadsUIContext.openDeleteLeadDialog,
    };
  }, [leadsUIContext]);

  // Getting curret state of leads list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.leads }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Leads Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    leadsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchLeads(leadsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "comments",
      text: "Comments",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "client_type",
      text: "Client Type",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "listing_link",
      text: "Listing Link",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "make.name",
      text: "Make",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "model.name",
      text: "Model",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "mileage",
      text: "Mileage",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "request",
      text: "Request",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "requested_price",
      text: "Requested Price",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "source",
      text: "Source",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "service",
      text: "Service",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "service_date",
      text: "Service Date",
      sort: true,
    },
    {
      dataField: "budget",
      text: "Budget",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "trrade_in_budget",
      text: "Trade In Budget",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLeadDialog: leadsUIProps.openEditLeadDialog,
        openDeleteLeadDialog: leadsUIProps.openDeleteLeadDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: leadsUIProps.queryParams.pageSize,
    page: leadsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  leadsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: leadsUIProps.ids,
                  setIds: leadsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
