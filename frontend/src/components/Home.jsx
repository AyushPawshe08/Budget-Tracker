import React from 'react';
import { ContainerScroll } from '../../components/ui/container-scroll-animation';
import banner from '../../public/banner.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-500">Budget</span>-Tracker
        </h1>
        <Link to="/login">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button></Link>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-16 px-4 mb-8">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-6xl font-bold mt-1 leading-none text-blue-500">
                  Scroll Animations
                </span>
              </h1>
            </div>
          }
        >
          <img
            src={banner}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
};

export default Home;

