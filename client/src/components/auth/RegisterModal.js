import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends React.Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  toggle = () => {
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    //create user object
    const newUser = {
      name,
      email,
      password
    };

    this.props.register(newUser);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for regester error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //if Authenticated close modal
    if (this.state.modal && this.props.isAuthenticated) {
      this.toggle();
    }
  }

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  id="name"
                  placeholder="John Doe"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  className="mb-3"
                  id="email"
                  placeholder="email@example.com"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  value={this.state.password}
                  className="mb-3"
                  id="password"
                  placeholder="********"
                  onChange={this.onChange}
                />
                <Button
                  type="submit"
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
