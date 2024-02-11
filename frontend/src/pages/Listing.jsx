import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact.jsx';
import { toast } from 'react-hot-toast';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const linktoaster = () => toast.success('Link Copied');
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className='p-4 relative  max-w-screen-lg flex flex-col  mx-auto my-4 bg-white rounded-lg shadow-md'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-xl text-red-700 font-semibold'>Something went wrong</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div onClick={()=>openImageInNewWindow(url)} className='h-[50vh] rounded-lg' style={{ background: `url(${url}) center no-repeat`,  backgroundSize: 'cover',}}>
                  </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div onClick={linktoaster} className='absolute top-[4%] right-[4%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-blue-100 cursor-pointer'>
            <FaShare
              className='text-blue-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true); setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          <div className='flex flex-col  items-center justify-center max-w-3xl mx-auto p-3 gap-4'>
            <p className='text-2xl font-semibold font-mono uppercase p-2 rounded-lg border-4 border-dashed border-blue-900'>{listing.name}</p>
            <p className=' font-semibold font-serif text-lg'><span className='text-blue-700 font-bold text-xl'>Rate :-</span>  ₹{' '}
              {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-2 gap-1 font-medium text-slate-700 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-violet-900 text-sx font-semibold w-[150px] text-white text-center p-2 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-blue-800 w-full max-w-[200px] text-white font-semibold text-center p-2 rounded-md'>
                  OFFER ₹{+listing.regularPrice - +listing.discountedPrice} OFF
                </p>
              )}
            </div>
            <p className='text-gray-700 text-sx font-semibold'>
              <span className='font-semibold text-black text-sx'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-blue-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} bedrooms `
                  : `${listing.bedrooms} bedroom `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms `
                  : `${listing.bathrooms} bathroom `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white font-semibold text-center rounded-lg uppercase hover:opacity-95 p-3 m-2'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact className='w-full'listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}