
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect} from 'react';
import  { useState } from 'react';
import Load from '../../Popup/loading.js';
import ConfirmationDialog from '../../Popup/ConfirmationDialog.js';
import ResponsiveAlert from '../../Popup/alert.js';
import '../../css/alert.css';

const baseURL = "http://localhost:5044/api/Students";

function Student()
{
    const[status,setStatus]=useState(true);
    const[getAllRecord,SetAllRecod]=useState([]);
    const [IsConfirmation, setIsConfirmation] = useState(false);
    const [DeleteId, setDeleteId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // useEffect(()=>{
    //  axios.get(baseURL).then(res=>{
    //     debugger;
    //     console.log(res.data);
    //     SetAllRecod(res.data)
    //     setStatus(false)
    //  })
    // });

    useEffect(() => {
        setTimeout(() => {
            axios.get(baseURL)
            .then(res => {
                SetAllRecod(res.data);
                setStatus(false);
            })
            .catch(error => {
                debugger;
                console.error('Error fetching data:', error);
                setAlertMessage('There are some technical issues. Kindly contact customer support.'+error);
                setShowAlert(true);
              });
        }, 1000); // 1000 milliseconds = 1 seconds
    }, []);// Empty dependency array means this effect runs once on component mount

    debugger;

    const closeAlert = (e) => {
        setShowAlert(false);
        const superParent = e.target.closest('.responsive-alert');
        console.log(superParent);
        superParent.style.display = 'none';      
      }

    if(status)             
    {
    // I am traying to assurse that  if is there is any exception during API calling like cors and refuse connection
       //then it means "status" will always be true 
       if(showAlert)
       return(
        showAlert && <ResponsiveAlert message={alertMessage} onClose={closeAlert} />
        );
      
        //return <Load />;
       //or
       return <Load></Load>

         //bootstrap Spinners
        // return (
        //     <div class="d-flex justify-content-center">
        //         <div class="spinner-border" role="status">
        //           <span class="sr-only">Loading...</span>
        //         </div>
        //       </div>
        // )
    }
    const openConfirmation = (id) => {
        setDeleteId(id);
        setIsConfirmation(true);
      }

      const closeConfirmation = () => {
        debugger;
        setIsConfirmation(false);
      }

      const confirmDelete =()=>{
        debugger;
        axios.delete(baseURL+"/"+DeleteId)
        .then(()=>{
            setIsConfirmation(false);
            setDeleteId(null);

      // Update state after successful delete
      const updatedRecords = getAllRecord.filter(item => item.id !== DeleteId);
      SetAllRecod(updatedRecords);

           // navigate('/student');
        })
        .catch(error => {
            console.error('Error:', error);
            setIsConfirmation(false);
            setDeleteId(null);
          });
      }

    var studentDetail=getAllRecord.map((iteam,index)=>{
        console.log(iteam)
      return(
        <tr key={index}>
            <td>{iteam.name}</td>
            <td>{iteam.email}</td>
            <td>{iteam.rollno}</td>
            {/* <td><Link to={'/student/'+iteam.id+'/edit'} className="btn btn-primary">Edit</Link></td> */}
            <td><Link to={'/student/'+iteam.id+'/update'} className="btn btn-primary">Edit</Link></td>
            <td><button onClick={() => openConfirmation(iteam.id)}>
                     <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
        </td>
        </tr>
      )
    });
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Student List
                                 <Link to="/student/create" className="btn btn-primary float-end">Add Student</Link>
                            </h4>
                        </div>
                        <div className="card-body">

                        {/* {showAlert && <ResponsiveAlert message={alertMessage} onClose={() => setShowAlert(false)} />}   */}

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Roll No</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {studentDetail}
                                    </tbody>
                            </table>
                            {console.log("-----------"+showAlert)}
                            <ConfirmationDialog isOpen={IsConfirmation} onCancel={closeConfirmation}
                            onConfirm={confirmDelete}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Student;