import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
export default function CreateListing() {
  const {currentUser}=useSelector(state=>state.user);
  const navigate=useNavigate();
    const [files,setFiles]=useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',description: '',address: '',
        type: 'rent',bedrooms: 1,bathrooms: 1,regularPrice: 1,
        discountedPrice: 0,offer: false,parking: false, furnished: false,
      });
    const [imageUploadError,setImageUploadError]=useState(false);
    const [uploading, setUploading] = useState(false);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError('Image upload failed (3 mb max per image)');
              setUploading(false);
            });
        } else {
            if(files.length==0)
            setImageUploadError('Please select atleast 1 image to upload in listing');
            else
          setImageUploadError('You can only upload 6 images per listing');
          setUploading(false);
        }
      };
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
      const openImageInNewWindow = (url) => {
        toast.success("opening image in new tab");
        window.open(url, '_blank');
      };
      const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
        toast.success("image removed successfully");
      };
      const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
          setFormData({
            ...formData,
            type: e.target.id,
          });
        }else if (
          e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
          setFormData({
            ...formData, [e.target.id]: e.target.checked, });
        }else if ( e.target.type === 'number' || e.target.type === 'text' ||e.target.type === 'textarea') {
          setFormData({
            ...formData,
            [e.target.id]: e.target.value,
          });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (formData.imageUrls.length < 1)
            return setError('You must upload at least one image');
          if (+formData.regularPrice < +formData.discountedPrice)
            return setError('Discount price must be lower than regular price');
          setLoading(true);
          setError(false);
          const res = await fetch('/api/listing/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              userRef: currentUser._id,
            }),
          });
          const data = await res.json();
          setLoading(false);
          if (data.success === false) {
            setError(data.message);
          }
          navigate(`/listing/${data._id}`);
          toast.success("Redirecting you to the Listing Page");
        } catch (error) {
          console.log('koi error h kya');
          setError(error.message);
          setLoading(false);
        }
      };
    console.log(formData);
  return (
    <main className='p-8 max-w-screen-xl mx-auto m-8 bg-white b-2 shadow-lg rounded-lg shadow-blue-700 '>
        <h1 className='text-3xl font-bold text-center m-4 my-7 '>Create Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-8 '>
            <div className='flex flex-col gap-6 flex-1'>
                <input className='border border-gray-400 p-3 rounded-lg' type='text' placeholder='Title Name' id='name'
                 maxLength='64' minLength='8' required onChange={handleChange}
                 value={formData.name}/>
                 <textarea className='border border-gray-400 p-3 rounded-lg' type='text' placeholder='Description' id='description'
                  minLength='20' required onChange={handleChange}
                  value={formData.description}/>
                  <input type='text' placeholder='Address' className='border border-gray-400 p-3 rounded-lg' id='address' required
                  onChange={handleChange} value={formData.address}/>
                  <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='sale' className='w-4' onChange={handleChange}
                checked={formData.type === 'sale'} />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='rent' className='w-4 ' onChange={handleChange}
                checked={formData.type === 'rent'}/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-1 text-sm font-semibold' >
                        <input type='checkbox' id='parking' className='w-4' onChange={handleChange}
                checked={formData.parking}/>
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='furnished' className='w-4'  onChange={handleChange}
                checked={formData.furnished}/>
                        <span>Furnished</span>
                   </div>
                   <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='offer' className='w-4' onChange={handleChange}
                checked={formData.offer}/>
                        <span>Offer</span>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-5'>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-2 border border-gray-400 rounded-lg' type='number' id='bedrooms' min='1' max='100' required  onChange={handleChange}
                value={formData.bedrooms}/>
                        <p className='text-sm font-semibold self-center'>Bedrooms</p>
                    </div>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-2 border border-gray-400 rounded-lg' type='number' id='bathrooms' min='1' max='100' required
                         onChange={handleChange} value={formData.bathrooms}/>
                        <p className='text-sm font-semibold self-center'>Bathrooms</p>
                    </div>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-1 sm:p-2 border border-gray-400 rounded-lg' type='number' id='regularPrice' min='100' required
                         onChange={handleChange} value={formData.regularPrice}/>
                        <div className='flex flex-col'>
                        <p className='text-sm font-semibold'>Regular Price </p>
                        <span className='text-xs'>(₹ / month)</span>
                        </div>
                    </div>{
                      formData.offer &&( <div className='flex item-center sm:gap-2 font-semibold'>
                      <input className='p-1 sm:p-2 border border-gray-400 rounded-lg' type='number' id='discountedPrice' min='0' required
                      onChange={handleChange} value={formData.discountedPrice}/>
                      <div className='flex flex-col'>
                      <p className='text-sm font-semibold'>Discounted Price</p>
                      <span className='text-xs'>(₹ / month)</span>
                      </div>
                  </div>)
                    }
                   
                  </div>

            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold px-2'>Images:
                <span className='text-gray-500 px-2'>The first image will be used as the cover image, with a maximum of 6 images allowed for upload.</span>
                </p>
                <div className='flex p-2 gap-4'>
                <label htmlFor="images" className="flex gap-8 items-center">
                <input onChange={(e) => setFiles(e.target.files)} className="hidden" type="file"
                id="images" accept="image/*" multiple />
               <div className="p-4 border  border-gray-400 rounded cursor-pointer">Choose Files </div>
               <button disabled={uploading} type="button" onClick={handleImageSubmit}
               className="p-3 text-green-900 border  rounded uppercase font-semibold bg-green-300 hover:shadow-lg disabled:opacity-80">
   {uploading ? 'Uploading...' : 'Upload'}</button>
</label>
                </div>
                {imageUploadError && <p className='text-red-500 mt-1 mx-1 text-sm text-semibold'>{imageUploadError}</p>}
                {
  formData.imageUrls && formData.imageUrls.length > 0 && (
    <div className="flex flex-wrap gap-4 p-2">
      {formData.imageUrls.map((url, index) => (
        <div className='flex gap-2 justify-center border-2 border-gray-400 rounded-lg p-3'>
        <div key={index} className="flex flex-col items-center mx-2" onClick={() => openImageInNewWindow(url)}>
          <img src={url} alt={`listing-image-${index + 1}`} className='w-16 h-16  object-cover rounded-lg mb-2 cursor-pointer' />
          <span className="text-sm font-semibold">Image {index + 1}</span>
          </div>
          <button type='button' onClick={() => handleRemoveImage(index)} 
          className='p-4 text-red-700 rounded-lg uppercase hover:opacity-90 text-sm font-semibold'>delete</button>
        </div>
      ))}
    </div>
  )
}
          <button disabled={loading} className='mx-1 m-5 p-3 bg-blue-900 text-white rounded-lg uppercase 
            hover:opacity-90 disabled:opacity-80 '>{loading?"Creating...":'Create Listing'}</button>
            </div>
            {error && <p className='text-red-500 mt-1 mx-1 text-sm text-semibold'>{error}</p>}
        </form>
    </main>
  )
}
