import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-[#f3f8ff] shadow-md hover:shadow-lg transition-shadow overflow-hidden my-1 sm:my-2 rounded-lg w-full sm:w-[48%] lg:w-[31.3%]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=1024x1024&w=is&k=20&c=VDMvYrJR3Q7ZqAFqPpT1jd794HcjeQw-O39guW2e57A='
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full sm:p-5'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-cyan-800 mt-2 font-bold'>
            ₹{' '}
            {listing.offer
              ? listing.discountedPrice.toLocaleString('en-IN')
              : listing.regularPrice.toLocaleString('en-IN')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms `
                : `${listing.bedrooms} bedroom `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms `
                : `${listing.bathrooms} bathroom `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}