import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./LeadsUIHelpers";

const LeadsUIContext = createContext();

export function useLeadsUIContext() {
  return useContext(LeadsUIContext);
}

export const LeadsUIConsumer = LeadsUIContext.Consumer;

export function LeadsUIProvider({leadsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initLead = {
    id: undefined,
    name: "",
    category_type: "",
    comments: "",
    phone: "",
    email: "",
    client_type: "",
    listing_link: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    requested_price: "",
    budget: "",
    trade_in_budget: "",
    status: "",
    request_type: "",
    request: "",
    source: "",
    service: "",
    service_date: "",
    spare_part_requested: "",
    details: "",
    verification_date: "",
    inspection_date: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initLead,
    newLeadButtonClick: leadsUIEvents.newLeadButtonClick,
    openEditLeadDialog: leadsUIEvents.openEditLeadDialog,
    openDeleteLeadDialog: leadsUIEvents.openDeleteLeadDialog,
    openDeleteLeadsDialog: leadsUIEvents.openDeleteLeadsDialog,
    openFetchLeadsDialog: leadsUIEvents.openFetchLeadsDialog,
    openUpdateLeadsStatusDialog: leadsUIEvents.openUpdateLeadsStatusDialog
  };

  return <LeadsUIContext.Provider value={value}>{children}</LeadsUIContext.Provider>;
}