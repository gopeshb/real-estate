import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {Link } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess, 
  signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef=useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file,setFile]=useState(undefined);
  const[filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  const dispatch=useDispatch();
  const [updateSuccess,setUpdateSuccess]=useState(false);
  console.log(currentUser);
  useEffect(()=>{
  if(file){
  handleFileUpload(file);}},[file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure('nhi chal rha signout abhi'));
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto my-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-center">
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
          <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer" src={formData?.avatar||currentUser.avatar} alt="profile" />
          </div>
          <p className='text-sm self-center font-semibold'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error ( image must be less than 2 mb )
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
       
        <label htmlFor="username" className="text-sm font-semibold">
          Username
        </label>
        <input onChange={handleChange} type="text" defaultValue={currentUser.username} placeholder="Username" className="border p-2 rounded-lg text-slate-600 font-semibold" id="username" />
        
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input onChange={handleChange} type="email" defaultValue={currentUser.email} placeholder="Email" className="border p-2 rounded-lg text-slate-600 font-semibold" id="email" />

        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input onChange={handleChange} type="password" placeholder="Password" className="border p-2 rounded-lg text-slate-600 font-semibold" id="password" />
        
        <button disabled={loading} className="mx-1 bg-slate-700 text-center text-sm font-semibold text-white rounded-lg p-2 uppercase disabled:opacity-80 hover:opacity-90">
          {loading?'Loading...':'Update'}
        </button>
        <Link className='mx-1 bg-blue-500 text-center text-sm font-semibold uppercase text-white rounded-lg p-2 hover:opacity-90' to={"/create-listing"}>Create Listing</Link>
        <Link className='mx-1 bg-blue-500 text-center text-sm font-semibold uppercase text-white rounded-lg p-2 hover:opacity-90' to={"/show-listing"}>Show Listings</Link>
      </form>
      {error && <p className='text-red-500 mt-2 mx-1 text-sm'>{error}</p>}
      {updateSuccess && <p className='text-green-700 mt-2 mx-1 text-sm'>user updated successfully</p>}
      <div className="flex justify-between m-2">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer text-sm font-semibold">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer text-sm font-semibold">Sign Out</span>
      </div>
      
    </div>
  );
}

