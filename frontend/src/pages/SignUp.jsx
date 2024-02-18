import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("Redirecting to SignIn Page");
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto my-8 bg-white rounded-lg shadow-lg shadow-blue-700">
      <h1 className="text-2xl text-center font-bold my-7 mx-3">Sign Up</h1>
      <form className="flex flex-col gap-5 mx-3" onSubmit={submitHandler}>
        <label htmlFor="username" className="text-sm font-semibold">
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white py-2 px-4 text-sx font-semibold rounded-lg uppercase disabled:opacity-50 hover:opacity-90"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex items-center my-2 mx-3">
   <p className="text-sm font-semibold">Already have an account?</p>
   <Link to="/sign-in">
     <span onClick={()=>toast.success('Redirecting to Sign In page')} 
     className="text-blue-700 ml-1 hover:underline text-sm font-semibold">Sign In</span>
   </Link>
   </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
