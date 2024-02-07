import {GoogleAuthProvider,getAuth,signInWithPopup} from '@firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const GoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result= await signInWithPopup(auth,provider);
            console.log(result);
            const res=await fetch('api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photo}),
            });
            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        }catch(error){
            console.log('could not sign in with google',error);
        }
    }
  return (
    <button type='button'onClick={GoogleClick}
    className='bg-red-700 text-white py-2 px-4 rounded-lg uppercase disabled:opacity-50 hover:opacity-90 transition duration-300'> Continue with Google </button>
  )
}
