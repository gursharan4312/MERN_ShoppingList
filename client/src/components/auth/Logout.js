import React from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

const Logout = props => {
  return (
    <>
      <NavLink onClick={props.logout} href="#">
        LogOut
      </NavLink>
    </>
  );
};

Logout.prototype = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Logout);
