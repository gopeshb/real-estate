import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";

export default function Profile() {
  const fileRef=useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file,setFile]=useState(undefined);
  const[filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  console.log(formData);
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
  return (
    <div className="p-4 max-w-md mx-auto my-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="flex justify-center">
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
          <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer" src={formData.avatar||currentUser.avatar} alt="profile" />
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
        <input type="text" placeholder="Username" className="border p-2 rounded-lg" id="username" />
        
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input type="email" placeholder="Email" className="border p-2 rounded-lg" id="email" />

        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input type="password" placeholder="Password" className="border p-2 rounded-lg" id="password" />
        
        <button className="bg-slate-700 text-white rounded-lg p-2 uppercase disabled:opacity-80 hover:opacity-90">
          Update
        </button>
      </form>
      <div className="flex justify-between m-2">
        <span className="text-red-700 cursor-pointer text-sm font-semibold">Delete account</span>
        <span className="text-red-700 cursor-pointer text-sm font-semibold">Sign Out</span>
      </div>
    </div>
  );
}

