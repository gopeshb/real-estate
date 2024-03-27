import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ShowListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [listingsError, setListingsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleShowListings = async () => {
    try {
      setListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        if(data.message==='unauthorized access'){
          dispatch(signOutUserSuccess());
          toast.success("session expired,please sign in again");
          navigate('/sign-in');
          return;
        }
        setListingsError(true);
        setLoading(false);
        return;
      }
      setUserListings(data);
      setLoading(false);
    } catch (error) {
      setListingsError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleShowListings();
  }, []);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 max-w-screen-md flex flex-col gap-4 mx-auto my-6 bg-white rounded-lg shadow-lg shadow-blue-700">
      <h1 className="text-2xl font-semibold text-center mb-4 m-3">Your Listings</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : listingsError ? (
        <p className="text-center text-red-500">Error loading listings.</p>
      ) : userListings && userListings.length > 0 ? (
        userListings.map((listing,index) => (
            <div  key={listing._id} className='flex items-center'>
                <p className='p-2 font-semibold m-2'>{`${index + 1}:`}</p>
            <div className='border w-full rounded-lg p-3 flex justify-around items-center gap-4 mx-4' >
            <Link className='gap-4  flex items-center' to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt='listing cover'
                className='h-16 w-16 object-cover  rounded-lg'
              />
            </Link>
            <Link
              className=' font-semibold  hover:underline truncate flex'
              to={`/listing/${listing._id}`}
            >
              <p>{listing.name}</p>
            </Link>

            <div className='flex flex-col item-center'>
              <button  onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase font-semibold text-sm'>
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-700 uppercase font-semibold text-sm px-4'>Edit</button>
              </Link>
            </div>
          </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sx font-semibold text-blue-700">No listings found.</p>
      )}
    </div>
  );
}
