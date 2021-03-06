import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import * as actions from "../../_redux/leadsActions";
import {useLeadsUIContext} from "../LeadsUIContext";

export function LeadDeleteDialog({ id, show, onHide }) {
  // Leads UI Context
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      setIds: leadsUIContext.setIds,
      queryParams: leadsUIContext.queryParams
    };
  }, [leadsUIContext]);

  // Leads Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.leads.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteLead = () => {
    // server request for deleting lead by id
    dispatch(actions.deleteLead(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchLeads(leadsUIProps.queryParams));
      // clear selections list
      leadsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Lead Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this lead?</span>
        )}
        {isLoading && <span>Lead is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteLead}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
