import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditUser = () => {
const navigate = useNavigate();

const [data, setData]=useState({})
const { id } = useParams();
useEffect(() => {
  
     axios.get(`http://localhost:9000/api/v1/users/${id}`)
    .then(res => setData(res.data))
     .catch(err => console.log(err)) 
    }, [id]);


const handleEdit = async (e) => {

e.preventDefault();const formdata = new FormData();

formdata.append("name", data.name)
formdata.append("email", data.email)
formdata.append("gender", data.gender)
formdata.append("city", data.city)

if(data.profile){
formdata.append("profile", data.profile)
}

await axios.put(`http://localhost:9000/api/v1/edituser/${id}`,formdata,{
    headers:{
      "Content-Type": "multipart/form-data",
    },
});
navigate('/')
};

if(!data.name){
  return <div>Loading....</div>
}
return (
  <div className="container flex items-center justify-content-center">
    
    <form className="p-2 m-2" onSubmit ={handleEdit} >
      <div className="form-group m-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          name="name"
          value={data.name || ''}
          onChange={(e) => setData({ ...data, name:e.target.value})}
        />
      
      </div>
      <div className="form-group m-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email"
          name="email"            
          value={data.email || ''}             
          onChange={(e) => setData({ ...data, email:e.target.value})}

/>
  
      </div>
      <label htmlFor="gender">Gender</label>
      <div className="form-group">
        <div className="form-check form-check-inline m-3">
          <input
            className="form-check-input"
            type="radio"
            id="gender"
            value="Male"
            name="gender"
            checked= {data.gender === 'Male'}
            onChange={(e) => setData({ ...data, gender:e.target.value})}

         />
          <label className="form-check-label" htmlFor="gender">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="female"
            value="Female"
            name="gender"
            checked= {data.gender === 'Female'}
            onChange={(e) => setData({ ...data, gender:e.target.value})}

          />
          <label className="form-check-label">Female</label>
        </div>
      </div>
      <div className="form-group">
        <label>City</label>
        <select
          className="form-select m-2"
          name="city"
          value={data.city || ''}
          onChange={(e) => setData({ ...data, city:e.target.value})}
          >
          <option value="Botad">
            Botad
          </option>
          <option value="surat">Surat</option>
          <option value="ahmedabad">Ahmedabad</option>
          <option value="bhavnagar">Bhavnagar</option>
        </select>
      </div>
      <div className="form-group m-3">
        <label>Profile</label>
        <input
          type="file"
          name="profile"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) => setData({ ...data, profile:e.target.files[0]})}
      />
      </div>

      <button type="submit" className="btn btn-primary" >
        Update
      </button>
      <Link to="/" >
      <button className="btn btn-danger m-3">Cancel</button>
      </Link>
    </form>
  </div>
);
 
};

export default EditUser;

