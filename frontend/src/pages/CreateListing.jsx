import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-2 max-w-4xl mx-auto '>
        <h1 className='text-2xl font-bold text-center my-7 '>Create Listing</h1>
        <form className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-4 flex-1'>
                <input className='border p-3 rounded-lg' type='text' placeholder='Name' id='name'
                 maxLength='64' minLength='8' required/>
                 <textarea className='border p-3 rounded-lg' type='text' placeholder='Description' id='description'
                  minLength='8' required/>
                  <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required/>
                  <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='sale' className='w-4 '/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='rent' className='w-4  '/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-1 text-sm font-semibold' >
                        <input type='checkbox' id='parking' className='w-4'/>
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='furnished' className='w-4'/>
                        <span>Furnished</span>
                   </div>
                   <div className='flex gap-1 text-sm font-semibold'>
                        <input type='checkbox' id='offer' className='w-4 '/>
                        <span>Offer</span>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-5'>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-2 border-gray-400 rounded-lg' type='number' id='bedrooms' min='1' max='100' required/>
                        <p className='text-sm font-semibold self-center'>Beds</p>
                    </div>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-2 border-gray-400 rounded-lg' type='number' id='bathrooms' min='1' max='100' required/>
                        <p className='text-sm font-semibold self-center'>Bathrooms</p>
                    </div>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-2 border-gray-400 rounded-lg' type='number' id='regularPrice' min='1' required/>
                        <div className='flex flex-col'>
                        <p className='text-sm font-semibold'>Regular Price </p>
                        <span className='text-xs'>(₹ / month)</span>
                        </div>
                    </div>
                    <div className='flex item-center gap-2 font-semibold'>
                        <input className='p-2 border-gray-400 rounded-lg' type='number' id='discountedPrice' min='1' required/>
                        <div className='flex flex-col'>
                        <p className='text-sm font-semibold'>Discounted Price</p>
                        <span className='text-xs'>(₹ / month)</span>
                        </div>
                    </div>
                  </div>

            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold'>Images:</p>
                <span className='text-gray-500'>The first image will be used as the cover image (max image upload 6)</span>
                <div className='flex gap-4'>
                <input className='p-3 border border-gray-400 rounded w-full'type='file' id='images' accept='image/*' multiple/>
                    <button className='p-3 text-green-900 border rounded uppercase
                     bg-green-300 hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='mx-1 p-3 bg-blue-500 text-white rounded-lg uppercase 
            hover:opacity-90 disabled:opacity-80 '>Create Listing</button>
            </div>
            
        </form>
    </main>
  )
}
