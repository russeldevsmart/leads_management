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
    client_type: "",
    name: "",
    phone: "",
    email: "",
    make: null,
    model: null,
    budget: 0,
    status: "",
    source: "",
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
  };

  return <LeadsUIContext.Provider value={value}>{children}</LeadsUIContext.Provider>;
}