import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import './Home.css'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className='w-full flex flex-col mx-auto bg-[#0d192b]'>
      <div className='title-container max-w-3xl mx-auto items-center object-cover rounded-full drop-shadow-xl hue-rotate-30 flex flex-col flex-wrap justify-center w-full text-center h-[440px] '
       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/real-estate-315ad.appspot.com/o/background-img.jpg?alt=media&token=ce7b97ae-f405-4f9e-b51a-e81db70524ac)' }}>
        <p className='p-3 m-2 rounded-lg title-left text-3xl font-bold text-white bg-gradient-to-r  from-green-400 to-blue-500'>Are You Looking For A New Home?</p>
        <p className='title-right text-3xl rounded-lg text-teal-200 bg-gradient-to-r from-sky-500 to-blue-500 p-3 font-bold'>Try 
        <span className='text-emerald-300 '> Property</span>
        <span className='text-indigo-700'>Estate</span></p>
      </div>
      <div className='max-w-7xl mx-auto p-5 flex flex-col gap-8 my-10 w-full sm:px-12 lg:px-8'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-sky-600'>Exclusive Offers:</h2>
              <Link className='text-sm text-slate-200 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 justify-between'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-sky-600'>Recent places for rent</h2>
              <Link className='text-sm text-slate-200 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4 justify-between'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-sky-600'>Recent places for sale</h2>
              <Link className='text-sm text-slate-200 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4 justify-between'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );}