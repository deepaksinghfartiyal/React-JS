import axios from "axios";
import React, { useEffect } from "react";

const baseURL = "http://localhost:5044/api/Students";

function GetAll() {
  let setTableData = [];

  const renderComponent = () => {
    // Render the component when the data changes
    const component = (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Student List</h4>
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
                    {setTableData.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.rollno}</td>
                        <td>{/* Add action elements here */}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    ReactDOM.render(component, document.getElementById("root")); // Render to your root element
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        const multipleObjects = res.data.map((item) => {
          const { id, name, email, rollno } = item;
          return {
            id: id,
            name: name,
            email: email,
            rollno: rollno,
          };
        });
        setTableData = multipleObjects;
        renderComponent(); // Call the render function after data is updated
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  return null; // This component doesn't return any JSX, as rendering is done manually
}

export default GetAll;
