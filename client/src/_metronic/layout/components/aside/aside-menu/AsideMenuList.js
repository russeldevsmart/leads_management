/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useIntl } from "react-intl";
import SVG from "react-inlinesvg";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toAbsoluteUrl } from "../../../../_helpers";
import * as actions from "../../../../../app/modules/Leads/_redux/leadsActions";

export function AsideMenuList({ layoutProps }) {
  const intl = useIntl();
  // Leads Redux state
  const dispatch = useDispatch();
  const { listCategory } = useSelector(
    (state) => ({
      listCategory: state.leads.listCategory,
    }),
    shallowEqual
  );

  const changeCategory = (e, category) => {
    e.preventDefault();
    const initialFilter = {
      sortOrder: "-1",
      sortField: "edited_on",
      pageNumber: 1,
      pageSize: 10,
    };
    dispatch(actions.fetchLeads({...initialFilter, category}));
  }

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">{intl.formatMessage({ id: "MENU.CATEGORY" })}</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'new_cars' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'new_cars')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Voitures Neuves</span>
          </a>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'used_cars' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'used_cars')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Voitures Occasion</span>
          </a>
        </li>
        {/*end::1 Level*/}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'buyout_takeover' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'buyout_takeover')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Rachat/Reprise</span>
          </a>
        </li>
        {/*end::1 Level*/}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'inspection' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'inspection')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Inspections</span>
          </a>
        </li>
        {/*end::1 Level*/}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'verification' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'verification')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Vérifications</span>
          </a>
        </li>
        {/*end::1 Level*/}
        
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'services' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'services')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Services</span>
          </a>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'spare_parts' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'spare_parts')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Pièces de Rechange</span>
          </a>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${listCategory === 'other_requests' ? 'menu-item-active' : ''}`}
          aria-haspopup="true"
        >
          <a className="menu-link" href="#!" onClick={(e) => changeCategory(e, 'other_requests')}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Demandes Supplémentaires</span>
          </a>
        </li>
        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
