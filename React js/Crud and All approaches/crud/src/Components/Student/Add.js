import React from "react";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:5044/api/Students";

function AddForm() {
    debugger;
    const navigate = useNavigate();

    const formValidationMessage={
        name:'',
        email:'',
        rollno:''
    }
    console.log(formValidationMessage);
    const validateName = (name) => {
        if (name.trim() === "") {
            formValidationMessage.name="Name is required";
          return false;
        }
        formValidationMessage.name="";
        console.log("cccccccccccccccccccc");
        return true;
      };
      const validateEmail = (email) => {
        if (email.trim() === "") {
            formValidationMessage.email="Email is required";
          return false;
        } else if (!isEmailValid(email)) {
            formValidationMessage.email="Invalid email format";
          return false;
        }
        formValidationMessage.email="";
        console.log("cccccccccccccccccccc");
        return true;
      };
      const validateRollNo = (rollno) => {
        if (rollno.trim() === "") {
            formValidationMessage.rollno="Roll No is required";
          return false;
        } else if (!isRollNoValid(rollno)) {
            formValidationMessage.rollno="Invalid roll number format";
          return false;
        }
        formValidationMessage.rollno="";
        console.log("cccccccccccccccccccc");
        return true;
      };
      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }; 
      const isRollNoValid = (rollno) => {
      return !isNaN(rollno);
  };
  const handleBlur = (event) => {
    debugger;
    console.log("Input blurred", event.target.value);
    const currentNameAttributeValue=event.target.getAttribute('name');
    const inputElementsWithName = document.querySelectorAll('input[name="'+currentNameAttributeValue+'"]')[0];
    const nameValue =inputElementsWithName.getAttribute('name');
    if(nameValue==="name")
    { 
        const name=inputElementsWithName.value;
        const isNameValid = validateName(name);
        if(!isNameValid)
      {
        var elements = document.querySelectorAll('.text-danger.name')[0].innerHTML=formValidationMessage.name;
      }
    }
    else if(nameValue==="email")
    {
        const email=inputElementsWithName.value;
        const isEmailValidResult = validateEmail(email);
        if(!isEmailValidResult)
      {
        var elements = document.querySelectorAll('.text-danger.email')[0].innerHTML=formValidationMessage.email;
      }
    }
    else
    {
        const rollno=inputElementsWithName.value;
        const isRollNoValidResult = validateRollNo(rollno);
        if(!isRollNoValidResult)
        {
          var elements = document.querySelectorAll('.text-danger.rollno')[0].innerHTML=formValidationMessage.rollno;
        }
    }
    //const isNameValid = validateName(event.target.value);
    //const isEmailValidResult = validateEmail(formData.email);
    //const isRollNoValidResult = validateRollNo(formData.rollno);
    // Add your blur event handling logic here
  };
    const saveRecord = (event) => {
      debugger;
      event.preventDefault();
      const formData = {
        name: event.target.elements.name.value,
        email: event.target.elements.email.value,
        rollno:event.target.elements.rollno.value
      };
      console.log(formData);
      const isNameValid = validateName(formData.name);
      const isEmailValidResult = validateEmail(formData.email);
      const isRollNoValidResult = validateRollNo(formData.rollno);
      debugger;
      if(!isNameValid)
      {
        var elements = document.querySelectorAll('.text-danger.name')[0].innerHTML=formValidationMessage.name;
      }
      if(!isEmailValidResult)
      {
        var elements = document.querySelectorAll('.text-danger.email')[0].innerHTML=formValidationMessage.email;
      }
      if(!isRollNoValidResult)
      {
        var elements = document.querySelectorAll('.text-danger.rollno')[0].innerHTML=formValidationMessage.rollno;
      }
      // Process formData or send it to the server
      if (isNameValid && isEmailValidResult && isRollNoValidResult) {
        const data = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          rollno: formData.rollno.trim(),
        };
  
        axios
          .post(baseURL, data)
          .then((res) => {
            console.log(res.data);
            navigate("/list-form");
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
                <form onSubmit={saveRecord}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      name="name"
                      className="form-control"
                      onBlur={handleBlur}
                    />
                    {console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")}
                    {console.log("------"+formValidationMessage.name)}
                     {/* {formValidationMessage.name && <div className="text-danger">{formValidationMessage.name}</div>} */}
                     <div className="text-danger name"></div> 
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      name="email"
                      className="form-control"
                      onBlur={handleBlur}
                    />
                    <div className="text-danger email"></div>
                  </div>
                  <div className="mb-3">
                    <label>Roll No</label>
                    <input
                      name="rollno"
                      className="form-control"
                      onBlur={handleBlur}
                    />
                    <div className="text-danger rollno"></div>
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
  export default AddForm;
  