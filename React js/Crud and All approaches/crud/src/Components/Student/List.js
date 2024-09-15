
import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:5044/api/Students";
function GetAll()
{
      //empty object
    //let setTableData={};

    const [tableData, setTableData] = useState([]);
    //Empty array(we can add mutipal object inside array)

    //let tableData=[];

     //Qusetion:-why tableData=[]; is not woking?means why data is not binding in table body?
    //Answer
    //due to the asynchronous nature of the Axios requests. When you make a request with Axios, 
    //it returns a promise which means that the data may not be available immediately. 
    //In your code, you're trying to map over setTableData before it's updated with the data from the Axios response.

    axios.get(baseURL)
    .then(res => {
        const multipleObjects = res.data.map(item => {
            const { id, name, email, rollno } = item;
            return {
                id: id,
                name: name,
                email: email,
                rollno: rollno
            };
        });
        setTableData(multipleObjects);
         //tableData=multipleObjects; 
    });

    useEffect(() => {
        setTimeout(() => {
            axios.get(baseURL)
            .then(res => {
                //SetAllRecod(res.data);
                //setStatus(false);
                const multipleObjects = res.data.map(item => {
                    const { id, name, email, rollno } = item;
                    return {
                        id: id,
                        name: name,
                        email: email,
                        rollno: rollno
                    };
                });
                setTableData=multipleObjects;
                console.log(setTableData)
            })
            .catch(error => {
                debugger;
                console.error('Error fetching data:', error);
                //setAlertMessage('There are some technical issues. Kindly contact customer support.'+error);
                //setShowAlert(true);
              });
        }, 1000); // 1000 milliseconds = 1 seconds
    }, []);// Empty dependency array means this effect runs once on component mount

    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>
                    Student List
                    <Link to="/student/add" className="btn btn-primary float-end">
                      Add Student
                    </Link> 
                  </h4>
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {tableData.length > 0 ? (
      tableData.map((student) => (
        <tr key={student.id}>
            {console.log("yyyyyyyyyyyyy"+student)}
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.rollno}</td>
            <td> 
                <Link
                to={"/student/edit/"+student.id}
                className="btn btn-primary"
                >
                Edit
                </Link> 
            </td>
        </tr>
    ))
) : (
    <p>Loading...</p>
)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
export default GetAll;