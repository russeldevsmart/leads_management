import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import {ModalProgressBar} from "../../../../../_metronic/_partials/controls";

export function LeadEditDialogHeader({ id }) {
  const intl = useIntl();
  // Leads Redux state
  const { leadForEdit, actionsLoading } = useSelector(
    (state) => ({
      leadForEdit: state.leads.leadForEdit,
      actionsLoading: state.leads.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : intl.formatMessage({id: "LEAD.NEW"});
    if (leadForEdit && id) {
      const name = `'${leadForEdit.name}'`;
      _title = intl.formatMessage({id: "LEAD.EDIT_FOR"}, { name });
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [leadForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
