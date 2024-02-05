import { useRef } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  
  const { currentUser } = useSelector((state) => state.user);
  const fileRef=useRef(null);
  return (
    <div className="p-4 max-w-md mx-auto my-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="flex justify-center">
          <input type="file" ref={fileRef} hidden accept="image/*" />
          <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer" src={currentUser.avatar} alt="profile" />
        </div>
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

