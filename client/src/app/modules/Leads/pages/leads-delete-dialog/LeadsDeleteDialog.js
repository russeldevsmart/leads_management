import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/leadsActions";
import { useLeadsUIContext } from "../LeadsUIContext";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";

export function LeadsDeleteDialog({ show, onHide }) {
  // Leads UI Context
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      ids: leadsUIContext.ids,
      setIds: leadsUIContext.setIds,
      queryParams: leadsUIContext.queryParams,
    };
  }, [leadsUIContext]);

  // Leads Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.leads.actionsLoading }),
    shallowEqual
  );

  // if leads weren't selected we should close modal
  useEffect(() => {
    if (!leadsUIProps.ids || leadsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteLeads = () => {
    // server request for deleting lead by selected ids
    dispatch(actions.deleteLeads(leadsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchLeads(leadsUIProps.queryParams)).then(
        () => {
          // clear selections list
          leadsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          Leads Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected leads?</span>
        )}
        {isLoading && <span>Lead are deleting...</span>}
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
            onClick={deleteLeads}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
