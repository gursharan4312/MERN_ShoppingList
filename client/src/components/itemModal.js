import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends React.Component {
  state = {
    modal: false,
    name: ""
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    //Add item via add item action
    this.props.addItems(newItem);

    //close modal
    this.toggle();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please Login to manage Items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  id="item"
                  placeholder="Add Shopping item"
                  onChange={this.onChange}
                />
                <Button
                  type="submit"
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItems }
)(ItemModal);
