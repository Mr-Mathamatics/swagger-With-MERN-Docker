import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomButton, CustomInput } from "../custom/Input";
import axios from 'axios';

function CRUDForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [dataList, setDataList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then(res=>{
      setDataList(res.data)
    }).catch(err=>{
      toast.error(err.message)
    })
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const item=dataList[index];
    item[name]=value;
    setDataList([...dataList])
  };

  const getUsers=async ()=>{
    axios.get('http://localhost:5000/api/users').then(res=>{
      setDataList(res.data)
    }).catch(err=>{
      toast.error(err.message)
      console.log(err)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users',formData).then(res=>{
      setFormData({name:"",email:""})
      getUsers();
    }).catch(err=>{
      toast.error(err.message)
      console.log(err)
    })
  };

  const handleEdit = (index,id) => {
    const editedItem = dataList[index];
    axios.put(`http://localhost:5000/api/users/${id}`,editedItem).then(res=>{
      getUsers();
      
    }).catch(err=>{
      toast.error(err.message)
      console.log(err)
    })
    setEditIndex(null)
    setEditMode(!editMode);
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`).then(res=>{
      getUsers();
    }).catch(err=>{
      toast.error(err.message)
      console.log(err)
    })
  };

  return (
    <div className="container mx-auto max-w-4xl mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <CustomInput
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <CustomButton type="submit">{"Create"}</CustomButton>
      </form>
      <table className="mt-6 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataList.length ? dataList.map((data, index) => (
            <tr key={index}>
              <td className="border text-center border-gray-300 px-4 py-2">
                {index + 1}
              </td>
              <td className="border text-center border-gray-300 px-4 py-2">
                <CustomInput
                  type="text"
                  name="name"
                  value={data.name || ""}
                  onChange={(e) => handleChange(e, index)}
                  disabled={editIndex!=index}
                  required
                />
              </td>
              <td className="border text-center border-gray-300 px-4 py-2">
                <CustomInput
                  type="email"
                  value={data.email || ""}
                  name="email"
                  onChange={(e) => handleChange(e, index)}
                  disabled={editIndex!=index}
                  required
                />
              </td>
              <td className="border text-center border-gray-300 px-4 py-2">
                { editIndex!=index ?<><CustomButton
                  onClick={() => {
                    setEditIndex(index)
                    setEditMode(true)
                  }}
                  className="mr-2"
                >
                  Edit
                </CustomButton><CustomButton
                  onClick={() => handleDelete(data._id)}
                  className="text-red-500"
                >
                  Delete
                </CustomButton></>
                : editIndex === index&&<div>
                <CustomButton
                  onClick={() => handleEdit(index,data._id)}
                  className="mr-2"
                >
                  save
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    setEditIndex(null)
                    getUsers()}}
                  className="mr-2"
                >
                  cancel
                </CustomButton>
                </div>
}
              </td>
            </tr>
          )): <tr><td colSpan={4}><div style={{textAlign:'center',padding: '10px 0'}}>No data found</div></td></tr>}
        </tbody>
      </table>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default CRUDForm;
