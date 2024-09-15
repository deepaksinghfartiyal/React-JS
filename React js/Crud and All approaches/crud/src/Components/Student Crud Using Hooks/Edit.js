import axios from "axios";
import React, { useEffect,useState } from "react";
import {useParams, Link, useNavigate } from "react-router-dom";

const baseURL = "http://localhost:5044/api/Students";

const Student = (id = "", name = "", email = "", rollno = "") => {
  return { id, name, email, rollno };
};

const EditFunction = () => {
  let {id}=useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(Student);
  const [NameErrors, setNameErrors] = useState({});
  const [EmailErrors, setEmailErrors] = useState({});
  const [RollNoErrors, setRollNoErrors] = useState({});


  useEffect(() => {
    // Fetch data when component mounts
    axios.get(baseURL + "/" + id)
      .then(res => {
        setStudent(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const validateName = () => {
    if (student.name.trim() === "") {
        setNameErrors({ name: "Name is required" });
      return false;
    }
    setNameErrors({ name: "" });
    return true;
  };

  const validateEmail = () => {
    if (student.email.trim() === "") {
        setEmailErrors({ ...EmailErrors, email: "Email is required" });
      return false;
    } else if (!isEmailValid(student.email)) {
        setEmailErrors({ ...EmailErrors, email: "Invalid email format" });
      return false;
    }
    setEmailErrors({ ...EmailErrors, email: "" });
    return true;
  };

  const validateRollNo = () => {
    if (student.rollno === "") {
        setRollNoErrors({ rollno: "Roll No is required" });
      return false;
    } else if (!isRollNoValid(student.rollno)) {
        setRollNoErrors({rollno: "Invalid roll number format" });
      return false;
    }
    setRollNoErrors({ rollno: "" });
    return true;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isRollNoValid = (rollno) => {
    return !isNaN(rollno);
  };

  const updateData = (e) => {
    debugger;

    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValidResult = validateEmail();
    const isRollNoValidResult = validateRollNo();
    debugger;
    if (isNameValid && isEmailValidResult && isRollNoValidResult) {
      const data = {
        name: student.name.trim(),
        email: student.email.trim(),
        rollno: student.rollno.toString().trim()
      };

      axios
        .post(baseURL, data)
        .then((res) => {
          console.log(res.data);
          navigate("/student");
        })
        .catch((error) => {
          if (error.response) {
            console.error("Response error:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request error:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
          console.error("Error config:", error.config);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

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
              <form onSubmit={updateData}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    name="name"
                    value={student.name}
                    onChange={handleInputChange}
                    onBlur={validateName}
                    className="form-control"
                  />
                  <div className="text-danger">{NameErrors.name}</div>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    name="email"
                    value={student.email}
                    onChange={handleInputChange}
                    onBlur={validateEmail}
                    className="form-control"
                  />
                  <div className="text-danger">{EmailErrors.email}</div>
                </div>
                <div className="mb-3">
                  <label>Roll No</label>
                  <input
                    name="rollno"
                    value={student.rollno}
                    onChange={handleInputChange}
                    onBlur={validateRollNo}
                    className="form-control"
                  />
                  <div className="text-danger">{RollNoErrors.rollno}</div>
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
};

export default EditFunction;
