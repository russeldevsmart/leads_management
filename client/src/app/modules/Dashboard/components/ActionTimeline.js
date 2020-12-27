import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import moment from "moment";
import { useIntl } from "react-intl";

export default function ActionTimeline() {
  const intl = useIntl();

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
          <h3 className="card-label">{intl.formatMessage({ id: "DASHBOARD.LAST_ACTIONS" })}</h3>
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
                        <div dangerouslySetInnerHTML={{ 
                          __html: intl.formatMessage({id: "ACTIONS.LEAD.CREATED"}, {
                            name: `<span class="font-weight-bolder text-dark-75 font-size-lg">${action.user.fullname}</span>`,
                            lead: `<a href="/leads/${action.lead._id}/edit" class="menu-link">${action.lead.name}</a>`
                          })
                        }}></div>
                      )
                    }
                    {
                      action.action_type === 'lead_comments' && (
                        <div dangerouslySetInnerHTML={{ 
                          __html: intl.formatMessage({id: "ACTIONS.LEAD.WRITE_COMMENT"}, {
                            name: `<span class="font-weight-bolder text-dark-75 font-size-lg">${action.user.fullname}</span>`,
                            comment: `<span class="font-weight-bold text-dark-75">${action.content}</span>`,
                            lead: `<a href="/leads/${action.lead._id}/edit" class="menu-link">${action.lead.name}</a>`
                          })
                        }}></div>
                      )
                    }
                    {
                      action.action_type === 'lead_updated' && (
                        <div dangerouslySetInnerHTML={{ 
                          __html: intl.formatMessage({id: "ACTIONS.LEAD.UPDATED"}, {
                            name: `<span class="font-weight-bolder text-dark-75 font-size-lg">${action.user.fullname}</span>`,
                            content: `<span class="font-weight-bold text-dark-75">${action.content}</span>`,
                            lead: `<a href="/leads/${action.lead._id}/edit" class="menu-link">${action.lead.name}</a>`
                          })
                        }}></div>
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
