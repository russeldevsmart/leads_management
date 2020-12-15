/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { Dropdown } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_helpers";
import {
  DropdownItemToggler,
  DropdownMenu4,
} from "../../../_partials/dropdowns";

export function AsideSearch({ isActive }) {
  return (
    <div
      className={`tab-pane p-3 px-lg-7 py-lg-5 fade ${isActive &&
        "show active"}`}
    >
      {/* begin::Form */}
      <form className="p-2 p-lg-3">
        <div className="d-flex">
          <div className="input-icon h-40px">
            <input
              type="text"
              className="form-control form-control-lg form-control-solid h-40px"
              placeholder="Search..."
              id="generalSearch"
              autoComplete="false"
            />
            <span>
              <span className="svg-icon svg-icon-lg">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                />
              </span>
            </span>
          </div>

          <Dropdown drop="down" alignRight>
            <Dropdown.Toggle
              as={DropdownItemToggler}
              id="kt_quick_actions_search_toggle"
            >
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id="quick-search-tooltip">Quick search</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-default btn-hover-primary ml-2 h-40px w-40px flex-shrink-0"
                >
                  <span className="svg-icon svg-icon-xl">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Code/Compiling.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
              <DropdownMenu4 />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </form>
      {/* end::Form */}
    </div>
  );
}
