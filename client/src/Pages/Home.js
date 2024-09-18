 /* eslint-disable */

import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";
import { getAllUsers } from "../redux/reducers/userSlice";
import axios from "axios";
const Home = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [data, setData]=useState({})



  useEffect(() =>{
    dispatch(getAllUsers());
  },[])
  const handleDelete =  async(id)=> {
    const confirmDel = window.confirm("Are you sure you want to delete this user?");
    if(!confirmDel) return;
    await axios.delete(`http://localhost:9000/api/v1/deleteuser/${id}`);    
    alert('User deleted succcessfully');
   // const newUsers =
    setData((preUsers) => {
      const updateUsers = { ...preUsers };
      delete updateUsers[id];
      return updateUsers;
      });
    navigate('/')
  }
const { users } = useSelector((state) => state.users)
  return (
    <div className="container flex items-center justify-content-center">
      <h2
        style={{ backgroundColor: "blue" }}
        className="text-center text-white p-2 m-2"
      >
        User Management System
      </h2>
      
       <Link to="/rejister">
       <button className="btn btn-primary">
          <i className="fa fa-home" />
          &nbsp; Add Users
        </button>
       </Link>
    

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>City</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => {
            return(    <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>
                  <td>
                    <img
                      src={`http://localhost:9000/${user.profile}`}
                      className="img img-rounded"
                      height="100px"
                      width="100px"
                   alt="" />
                  </td>
                  <td>
                  <Link to = {`/editUser/${user._id}`}>
                  <button className="btn btn-primary mx-2" >Edit</button>
                  </Link>
                    
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)} >Delete</button>
                  
                  </td>
                </tr>
            )
            })
          }
                
            
        </tbody>
      </table>
    </div>
  );
};

export default Home;