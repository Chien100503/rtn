import React, { Component } from "react";
import moment from "moment";
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

class EditInvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errorMessage: "",
      loading: false,
    };
  }

  componentDidMount() {
    // state value is updated by selected employee data
    const { invoice_name, invoice_totalamount, invoice_date, invoice_status } = this.props.selectedInvoice;
    this.setState({
      name: invoice_name,
      totalamount: invoice_totalamount,
      date: invoice_date,
      status: invoice_status,
    });
  }
  toggleCheck = () => {
    this.setState({ status: !this.state.status });
  };
  handleChange = (value, state) => {
    this.setState({ [state]: value });
  };

  updateInvoice = () => {
    // destructure state
    const { name, description } = this.state;
    this.setState({ errorMessage: "", loading: true });

    if (name && description) {
      // selected employee is updated with employee id
      fetch(`https://6363bfe837f2167d6f824b72.mockapi.io/api/learns/${this.props.selectedInvoice.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.props.closeModal();
          this.props.updateInvoice({
            name: res.name,
            description: res.description,
            id: res.id,
          });
        })
        .catch(() => {
          this.setState({ errorMessage: "Network Error. Please try again.", loading: false });
        });
    } else {
      this.setState({ errorMessage: "Fields are empty.", loading: false });
    }
  };

  render() {
    const { isOpen, closeModal } = this.props;
    const { name, description, loading, errorMessage } = this.state;
    return (
      <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Update Invoice</Text>

          <TextInput value={name} style={styles.textBox} onChangeText={(text) => this.handleChange(text, "name")} placeholder="name" />

          <TextInput defaultValue={description} keyboardType="numeric" style={styles.textBox} onChangeText={(text) => this.handleChange(text, "description")} placeholder="Amount" />
          <View style={{ ...styles.buttonContainer }}>
            <Checkbox.Item label="Check me" status={this.state.status ? "checked" : "unchecked"} onPress={this.toggleCheck} />
          </View>
          {loading ? <Text style={styles.message}>Please Wait...</Text> : errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.updateInvoice} style={{ ...styles.button, marginVertical: 0 }}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal} style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default EditInvoiceModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.3)",
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  message: {
    color: "tomato",
    fontSize: 17,
  },
});
