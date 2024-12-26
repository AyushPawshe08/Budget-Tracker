import React from 'react';
import { Plus } from 'lucide-react';
import Dashboard from "./Dashboard";

const Income = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <Dashboard />

      <div className='p-10 w-full md:w-2/3 lg:w-1/2'>
        <h1 className='text-5xl text-green-500 font-bold mb-5'>Income</h1>
        
        <div className='mb-8'>
          <p className='text-lg'>Total income</p>
        </div>

        <form className='space-y-4'>
          <input type="text" placeholder='Enter your Income' className='w-full p-2 border border-gray-300 rounded-md'/>
          <input type="number" placeholder='Enter amount' className='w-full p-2 border border-gray-300 rounded-md'/>
          <input type="text" placeholder='Enter category' className='w-full p-2 border border-gray-300 rounded-md'/>
          <button className='flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md'>
            <Plus className='mr-2'/> Add income
          </button>
        </form>
      </div>

      <div className='mt-10 w-full md:w-1/3 lg:w-1/4'>
        <h1 className='text-2xl font-semibold mb-4'>Income List</h1>
        
        <div className='border border-black p-4 rounded-md mb-4'>
          <h2 className='text-xl font-bold mb-2'>Bitcoin</h2>
          <ol className='list-disc list-inside'>
            <li> $5</li>
            <li>05/8/2025</li>
            <li>Bitcoin money</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Income;
