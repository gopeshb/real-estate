import React from 'react';

const AboutPage = () => {
  return (
    <main className='p-6 m-8 relative  max-w-screen-lg flex flex-col  mx-auto  bg-white rounded-lg shadow-lg shadow-blue-700'>
      <h1 className='text-center bg-gradient-to-r from-indigo-500 rounded-lg p-2 font-bold text-2xl text-sky-600'>ABOUT US:</h1>
      <div >
        <p className='text-xl font-mono p-5 flex-wrap m-5 text-center'>
        This website is developed as a demo project, showcasing a front end crafted with React and Tailwind CSS,
         leveraging the functionalities of the Redux Toolkit. The backend, powered by Express.js, utilizes MongoDB for data storage. 
         For image storage,
         Firebase Storage is employed, and authentication is seamlessly handled using Firebase and manual methods.
        </p>
      </div>
      <h1 className='text-center bg-gradient-to-r from-sky-500 rounded-lg p-2 font-bold text-2xl text-sky-600'>CONTACT US:</h1>
      <div >
        <p className='text-xl font-mono p-5 flex-wrap m-5 text-center'>
        Looking to connect with me, Gopesh Bhatia, the creator of Property Estate? I'm happy to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out using the methods below:
     <br/> Email: gopeshbhatia02@gmail.com
        </p>
      </div>
     
      </main>
     
  );
};

export default AboutPage;

