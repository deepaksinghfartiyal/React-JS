import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
//import { useHistory } from 'react-router-dom';

const baseURL = "http://localhost:5044/api/Students";

function Edit()
{
    let {id}=useParams();
    const navigate=useNavigate();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [rollNoError, setRollNoError] = useState('');
    debugger
    const [student, setStudent] = useState({
        id:id,
        name: '',
        email: '',
        rollno: ''
      });

    //  useEffect(()=>{
    //  axios.get(baseURL+"/"+id).then(res=>{
    //     setStudent(res.data)//{id: 39, name: 'uu', email: 'dsf@gmail.com', rollno: 44}
    //     console.log("student data:-"+res.data);
    //  })
    // });

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

    const handleInput1=(e)=>{
        //e.target.name is the name attribute of the input element that triggered the handleInput function,
        //e.target.value is the value of the input.
        console.log({...student,[e.target.name]:e.target.value});
        setStudent({...student,[e.target.name]:e.target.value});
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        const updatedProperty = {};
      
        if (name === 'name') {
          updatedProperty.name = value;
        } else if (name === 'email') {
          updatedProperty.email = value;
        } else if (name === 'rollno') {
          updatedProperty.rollno = value;
        }
      
        setStudent(prevStudent => ({
          name: updatedProperty.name || prevStudent.name,
          email: updatedProperty.email || prevStudent.email,
          rollno: updatedProperty.rollno || prevStudent.rollno
        }));
      };

    const UpdateData=(e)=>{
       debugger; 
    e.preventDefault();

    validateName();
    validateEmail();
    validateRollNo();

    if (nameError || emailError || rollNoError) {
        return;
    }
    debugger;
    // axios.get(baseURL)
    // .then(res=>{

    //    student.name= res.data.name;
    //    student.email=res.data.email;
    //    student.rollno=res.data.rollno;
    //    setStudent(res.data)

    // });

    const data={
        id:student.id,
        name:student.name.trim(),
        email:student.email.trim(),
        rollno:student.rollno
    }
    axios.put(baseURL,data).then(res=>{
       console.log(res.data);
    // Now navigate to another component
       //const history = useHistory();
       //history.push('/student'); 
       //this.props.history.push('/student');
       navigate('/student');
    })
    .catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    });
   }
const validateName = () => {
    if (student.name.trim() === '') {
        setNameError('Name is required');
    } else {
        setNameError('');
    }
};

const validateEmail = () => {
    if (student.email.trim() === '') {
        setEmailError('Email is required');
    } else if (!isEmailValid(student.email)) {
        setEmailError('Invalid email format');
    } else {
        setEmailError('');
    }
};

const validateRollNo = () => {
    if (student.rollno === '') {
        setRollNoError('Roll No is required');
    } else if (!isRollNoValid(student.rollno)) {
        setRollNoError('Invalid roll number format');
    } else {
        setRollNoError('');
    }
};

const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
 }
 
 const isRollNoValid = (rollno) => {
    return !isNaN(rollno);
 }
    return(
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Edit student
                             <Link to="/student" className="btn btn-danger float-end">Back</Link>
                        </h4>
                    </div>
                    <div className="card-body"> 
                    <form onSubmit={UpdateData}>              
                    <div className="mb-3">
    <label>Name</label>
    <input type="hidden" name="id" value={student.id} /> 
    <input
        name="name"
        value={student.name}
        onChange={handleInput}
        onBlur={validateName}
        className="form-control"
        // required
    />
    <div className="text-danger">{nameError}</div>
</div>
<div className="mb-3">
    <label>Email</label>
    <input
        name="email"
        value={student.email}
        onChange={handleInput}
        onBlur={validateEmail}
        className="form-control"
        //required
    />
    <div className="text-danger">{emailError}</div>
</div>
<div className="mb-3">
    <label>Roll No</label>
    <input
        name="rollno"
        value={student.rollno}
        onChange={handleInput}
        onBlur={validateRollNo}
        className="form-control"
        //required
    />
    <div className="text-danger">{rollNoError}</div>
</div>

                                <div className="=mb-3">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                     </form>   
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Edit;