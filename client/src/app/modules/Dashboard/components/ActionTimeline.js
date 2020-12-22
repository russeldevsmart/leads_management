import React from "react";
import { NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import moment from "moment";

export default function ActionTimeline() {

  const { lastActions } = useSelector(
    (state) => ({
      lastActions: state.dashboard.lastActions,
    }),
    shallowEqual
  );
  return (
    <>
    <div className="card card-custom gutter-b">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">Last Actions</h3>
        </div>
      </div>
      <div className="card-body">
        <div className="timeline timeline-6 mt-3">
          {
            lastActions && lastActions.length > 0 && lastActions.map((action, index) => {
              let actionColor = "";
              if (action.action_type === 'lead_created')
                actionColor = "text-danger";
              else if (action.action_type === 'lead_comments')
                actionColor = "text-primary";
              else if (action.action_type === 'lead_updated')
                actionColor = "text-warning";
              return (
                <div className="timeline-item align-items-start" key={index}>
                  <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">{moment(action.date).format("HH:mm")}</div>
          
                  <div className="timeline-badge">
                    <i className={`fa fa-genderless ${actionColor} icon-xl`}></i>
                  </div>
          
                  <div className="font-weight-mormal timeline-content text-muted pl-3">
                    {
                      action.action_type === 'lead_created' && (
                        <>
                        <span className="font-weight-bolder text-dark-75 font-size-lg">{action.user.fullname}</span>&nbsp;
                          created the lead - <NavLink className="menu-link" to={`/leads/${action.lead._id}/edit`}>{action.lead.name}</NavLink>
                        </>
                      )
                    }
                    {
                      action.action_type === 'lead_comments' && (
                        <>
                        <span className="font-weight-bolder text-dark-75 font-size-lg">{action.user.fullname}</span>&nbsp;
                          left the comment - <span className="font-weight-bold text-dark-75">{action.content}</span> in <NavLink className="menu-link" to={`/leads/${action.lead._id}/edit`}>{action.lead.name}</NavLink>
                        </>
                      )
                    }
                    {
                      action.action_type === 'lead_updated' && (
                        <>
                        <span className="font-weight-bolder text-dark-75 font-size-lg">{action.user.fullname}</span> &nbsp;
                          udpated the <span className="font-weight-bold text-dark-75">{action.content}</span> in <NavLink className="menu-link" to={`/leads/${action.lead._id}/edit`}>{action.lead.name}</NavLink>
                        </>
                      )
                    }
                  </div>
              </div>
              )
            })
          }
        </div>
      </div>
    </div>
    </>
  );
};
