import React, { Component } from "react";
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

class AddInvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errorMessage: "",
    };
  }

  handleChange = (value, state) => {
    this.setState({ [state]: value });
  };

  addInvoice = () => {
    // destructure state
    const { name, description } = this.state;
    this.setState({ errorMessage: "", loading: true });

    if (name && description) {
      fetch("https://6363bfe837f2167d6f824b72.mockapi.io/api/learns", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.props.closeModal();
          this.props.addInvoice({
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
    const { loading, errorMessage } = this.state;
    return (
      <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Add New Invoice</Text>

          <TextInput style={styles.textBox} onChangeText={(text) => this.handleChange(text, "name")} placeholder="Name" />

          <TextInput keyboardType="numeric" style={styles.textBox} onChangeText={(text) => this.handleChange(text, "description")} placeholder="Amount" />

          {loading ? <Text style={styles.message}>Please Wait...</Text> : errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.addInvoice} style={{ ...styles.button, marginVertical: 0 }}>
              <Text style={styles.buttonText}>Submit</Text>
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

export default AddInvoiceModal;

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
