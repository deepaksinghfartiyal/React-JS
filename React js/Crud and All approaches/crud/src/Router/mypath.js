
import { Route, Routes } from 'react-router-dom';
import Home from '../Components/home';
import NoPage from '../Components/NoPage';

import Student from '../Components/Student Crud Using Hooks/student';
import Add from '../Components/Student Crud Using Hooks/AddStudent';
import Edit from '../Components/Student Crud Using Hooks/EditStudent';
import EditFunction from '../Components/Student Crud Using Hooks/Edit';

import AddForm from '../Components/Student/Add';
import EditDetail from '../Components/Student/Edit';
import GetAll from '../Components/Student/List';
import ParentComponent from '../Component Communication/UsingParentChild/parent';
import CustomApp from '../Component Communication/UsingContextAPI/CustomApp';
import CustApp from '../Component Communication/Context API/CustomeApi';
import AddFormFunction from '../Components/Student/AddUsingFunction';

function MyRouter()
{
  return (
    <Routes>
      <Route element={<Student />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<Add/>} path='/student/create'></Route>
      <Route element={<Edit/>} path='/student/:id/edit'/>
      <Route element={<Student/>} path='/student' />
      <Route element={<EditFunction/>} path='student/:id/update'/>

      <Route element={<GetAll/>} path='list-form'/>
      <Route element={<AddForm/>} path='/add-form' />
      <Route element={<EditDetail/>} path='edit-form'/>

      <Route element={<ParentComponent/>} path='parentCom'/>
      <Route element={<CustomApp/>} path='ContextApi' />
      <Route element={<CustApp/>} path='conApi'/>
      <Route element={<AddFormFunction/>} path='function'/>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default MyRouter