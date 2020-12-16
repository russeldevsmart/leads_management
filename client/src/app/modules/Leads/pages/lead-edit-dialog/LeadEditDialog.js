import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/leadsActions";
import { LeadEditDialogHeader } from "./LeadEditDialogHeader";
import { LeadEditForm } from "./LeadEditForm";
import { useLeadsUIContext } from "../LeadsUIContext";

export function LeadEditDialog({ id, show, onHide }) {
  // Leads UI Context
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      initLead: leadsUIContext.initLead,
    };
  }, [leadsUIContext]);

  // Leads Redux state
  const dispatch = useDispatch();
  const { actionsLoading, leadForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.leads.actionsLoading,
      leadForEdit: state.leads.leadForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Lead by id
    dispatch(actions.fetchCarMakes());
    dispatch(actions.fetchLead(id));
  }, [id, dispatch]);

  // server request for saving lead
  const saveLead = (lead) => {
    if (!id) {
      // server request for creating lead
      dispatch(actions.createLead(lead)).then(() => onHide());
    } else {
      // server request for updating lead
      dispatch(actions.updateLead(lead)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <LeadEditDialogHeader id={id} />
      <LeadEditForm
        saveLead={saveLead}
        actionsLoading={actionsLoading}
        lead={leadForEdit || leadsUIProps.initLead}
        onHide={onHide}
      />
    </Modal>
  );
}
