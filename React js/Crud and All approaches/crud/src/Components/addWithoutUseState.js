import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:5044/api/Students";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: { id: "", name: "", email: "", rollno: "" },
      errors: {},
      NameErrors: {},
      EmailErrors: {},
      RollNoErrors: {},
    };
  }

  validateName = () => {
    if (this.state.student.name.trim() === "") {
      this.setState({ NameErrors: { name: "Name is required" } });
      return false;
    }
    this.setState({ NameErrors: { name: "" } });
    return true;
  };

  validateEmail = () => {
    if (this.state.student.email.trim() === "") {
      this.setState({ EmailErrors: { email: "Email is required" } });
      return false;
    } else if (!this.isEmailValid(this.state.student.email)) {
      this.setState({ EmailErrors: { email: "Invalid email format" } });
      return false;
    }
    this.setState({ EmailErrors: { email: "" } });
    return true;
  };

  validateRollNo = () => {
    if (this.state.student.rollno.trim() === "") {
      this.setState({ RollNoErrors: { rollno: "Roll No is required" } });
      return false;
    } else if (!this.isRollNoValid(this.state.student.rollno)) {
      this.setState({ RollNoErrors: { rollno: "Invalid roll number format" } });
      return false;
    }
    this.setState({ RollNoErrors: { rollno: "" } });
    return true;
  };

  isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  isRollNoValid = (rollno) => {
    return !isNaN(rollno);
  };

  saveData = (e) => {
    e.preventDefault();

    const isNameValid = this.validateName();
    const isEmailValidResult = this.validateEmail();
    const isRollNoValidResult = this.validateRollNo();

    if (isNameValid && isEmailValidResult && isRollNoValidResult) {
      const data = {
        name: this.state.student.name.trim(),
        email: this.state.student.email.trim(),
        rollno: this.state.student.rollno.trim(),
      };

      axios
        .post(baseURL, data)
        .then((res) => {
          console.log(res.data);
          this.props.history.push("/student");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      student: { ...prevState.student, [name]: value },
    }));
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add student
                  <Link to="/student" className="btn btn-danger float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.saveData}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      name="name"
                      value={this.state.student.name}
                      onChange={this.handleInputChange}
                      onBlur={this.validateName}
                      className="form-control"
                    />
                    <div className="text-danger">{this.state.NameErrors.name}</div>
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      name="email"
                      value={this.state.student.email}
                      onChange={this.handleInputChange}
                      onBlur={this.validateEmail}
                      className="form-control"
                    />
                    <div className="text-danger">{this.state.EmailErrors.email}</div>
                  </div>
                  <div className="mb-3">
                    <label>Roll No</label>
                    <input
                      name="rollno"
                      value={this.state.student.rollno}
                      onChange={this.handleInputChange}
                      onBlur={this.validateRollNo}
                      className="form-control"
                    />
                    <div className="text-danger">{this.state.RollNoErrors.rollno}</div>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Add);
