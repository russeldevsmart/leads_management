import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export default function StatsWidgetCards() {
  const intl = useIntl();
  const { totalLeads, newLeads, ongoingLeads,goneLeads } = useSelector(
    (state) => ({
      totalLeads: state.dashboard.totalLeads,
      newLeads: state.dashboard.newLeads,
      ongoingLeads: state.dashboard.ongoingLeads,
      goneLeads: state.dashboard.goneLeads
    }),
    shallowEqual
  );

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="card card-custom bg-info gutter-b" style={{height: '150px'}}>
            <div className="card-body">
              <span className="svg-icon svg-icon-3x svg-icon-white ml-n2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")} />
              </span>
              <div className="text-inverse-primary font-weight-bolder font-size-h2 mt-3">{totalLeads}</div>
              <a href="#!" className="text-inverse-primary font-weight-bold font-size-lg mt-1">{intl.formatMessage({ id: "DASHBOARD.LEADS" })}</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="card card-custom bg-danger gutter-b" style={{height: '150px'}}>
            <div className="card-body">
              <span className="svg-icon svg-icon-3x svg-icon-white ml-n2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
              </span>
              <div className="text-inverse-primary font-weight-bolder font-size-h2 mt-3">{newLeads}</div>
              <a href="#!" className="text-inverse-primary font-weight-bold font-size-lg mt-1">{intl.formatMessage({ id: "DASHBOARD.NEW_LEADS" })}</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="card card-custom bg-dark gutter-b" style={{height: '150px'}}>
            <div className="card-body">
              <span className="svg-icon svg-icon-3x svg-icon-white ml-n2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Group-chat.svg")} />
              </span>
              <div className="text-inverse-primary font-weight-bolder font-size-h2 mt-3">{ongoingLeads}</div>
              <a href="#!" className="text-inverse-primary font-weight-bold font-size-lg mt-1">{intl.formatMessage({ id: "DASHBOARD.ONGOING_LEADS" })}</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="card card-custom bg-warning gutter-b" style={{height: '150px'}}>
            <div className="card-body">
              <span className="svg-icon svg-icon-3x svg-icon-white ml-n2">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Group-chat.svg")} />
              </span>
              <div className="text-inverse-primary font-weight-bolder font-size-h2 mt-3">{goneLeads}</div>
              <a href="#!" className="text-inverse-primary font-weight-bold font-size-lg mt-1">{intl.formatMessage({ id: "DASHBOARD.LOST_LEADS" })}</a>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};