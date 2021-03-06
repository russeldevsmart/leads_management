import React, { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import { LayoutSplashScreen } from "../../../_metronic/layout";
import StatsWidgetCards from "./components/StatsWidgetCards";
import WeeklyLeadsChart from "./components/WeeklyLeadsChart";
import LeadsStatusChart from "./components/LeadsStatusChart";
import LeadsTypeChart from "./components/LeadsTypeChart";
import CategoryChart from "./components/CategoryChart";
import LeadsSourceChart from "./components/LeadsSourceChart";
import YearlyHeatmapChart from "./components/YearlyHeatmapChart";
import ActionTimeline from "./components/ActionTimeline";

import * as actions from "./_redux/dashboardActions";

export default function Dashboard() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { loading, topLead } = useSelector(
    (state) => ({
      loading: state.dashboard.loading,
      topLead: state.dashboard.topLead,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAllData());
  }, [dispatch]);

  return (
    <>
      { loading ? <LayoutSplashScreen /> : (
        <>
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12">
              <StatsWidgetCards />
              <div className="row">
                <div className="col-lg-6">
                  <WeeklyLeadsChart />
                </div>
                <div className="col-lg-6">
                  <CategoryChart />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <LeadsStatusChart />
                </div>
                <div className="col-lg-6">
                  <YearlyHeatmapChart />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <LeadsTypeChart />
                </div>
                <div className="col-lg-6">
                  <LeadsSourceChart />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-custom gutter-b" style={{height: '150px'}}>
                    <div className="card-body d-flex align-items-center">
                      <div className="d-flex flex-column flex-grow-1 py-2 py-lg-5">
                        <span className="card-title font-weight-bolder font-size-h5 mb-2 text-primary">{topLead && topLead.name}</span>
                        <span className="font-weight-bold text-muted font-size-lg">{intl.formatMessage({ id: "DASHBOARD.TOP_LEAD" })}</span>
                      </div>
                      <img src={topLead && topLead.pic ? topLead.pic : toAbsoluteUrl("/media/users/blank.png")} className="ml-2 align-self-end h-100px" alt="" style={{ borderRadius: '50%'}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <ActionTimeline />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

