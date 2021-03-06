/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl, checkIsActive } from "../../../_helpers";
// import { AsideSearch } from "./AsideSearch";
import { AsideMenu } from "./aside-menu/AsideMenu";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";

export function Aside() {
  const intl = useIntl();
  const uiService = useHtmlClassService();
  const location = useLocation();
  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  useEffect(() => {
    document.body.classList.remove("aside-secondary-enabled");
    document.body.classList.remove("aside-secondary-disabled");
    if (checkIsActive(location, "/leads")) {   
      document.body.classList.add("aside-secondary-enabled");
    } else {
      document.body.classList.add("aside-secondary-disabled"); 
    }
  }, [location]);
  
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? ` active `
      : "";
  };

  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">

              {/* begin::Item */}
              <li
                className={`nav-item mb-3 ${getMenuItemActive("/dashboard")}`}
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Dashboard"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="dashboard">
                      {intl.formatMessage({id: "MENU.DASHBOARD"})}
                    </Tooltip>
                  }
                >
                  <NavLink className="nav-link btn btn-icon btn-clean btn-lg" to="/dashboard" >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Layout/Layout-4-blocks.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>

              {/* begin::Item */}
              <li
                className={`nav-item mb-3 ${getMenuItemActive("/leads")}`}
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Leads"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="leads-management">
                      {intl.formatMessage({id: "TOOLTIP.ALL_LEADS"})}
                    </Tooltip>
                  }
                >
                  <NavLink className="nav-link btn btn-icon btn-clean btn-lg" to="/leads" >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Group.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}
            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}
          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="toggle-aside">{intl.formatMessage({id: "TOOLTIP.TOGGLE_ASIDE"})}</Tooltip>}
                  >
                    <span
                      className={`aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm ${checkIsActive(location, "/leads") ? "" : "d-none"}`}
                      id="kt_aside_toggle"
                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </OverlayTrigger>
                </>
              )}
            {/* end::Aside Toggle */}
            {/* begin::Languages*/}
            {layoutProps.extrasLanguagesDisplay && <LanguageSelectorDropdown />}
            {/* end::Languages */}

            {/* begin::User*/}
            {layoutProps.extrasUserDisplay && <QuickUserToggler />}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {layoutProps.asideSecondaryDisplay && checkIsActive(location, "/leads") && (
          <>
            {/* begin::Secondary */}
            <div className="aside-secondary d-flex flex-row-fluid">
              {/* begin::Workspace */}
              <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content">
                  <AsideMenu isActive={true} />
                </div>
              </div>
              {/* end::Workspace */}
            </div>
            {/* end::Secondary */}
          </>
        )}
      </div>
      {/* end::Aside */}
    </>
  );
}
