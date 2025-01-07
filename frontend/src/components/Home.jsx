import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { ContainerScroll } from '../../components/ui/container-scroll-animation';
import Dashboard from '/DashBoard.png';
import { ArrowRight, BarChart2, PieChart, TrendingUp } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to login page
  };

  // FeatureCard Component
  const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-blue-800">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    );
  };

  // StepCard Component
  const StepCard = ({ number, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-blue-600 text-white w-12 h-12 flex items-center justify-center text-xl font-bold">
          {number}
        </div>
        <h3 className="mb-2 text-xl font-bold text-blue-800">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 shadow-md">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-blue-200">Budget</span>-Pro
        </h1>
        <button
          onClick={handleGetStarted} // Click triggers navigation to login
          className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition"
        >
          Get Started
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-16 px-0 mb-8"> {/* Changed px-4 to px-0 */}
        <ContainerScroll
          titleComponent={
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-800">
                Take Control of Your Finances
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                BudgetPro helps you track expenses, set financial goals, and make informed decisions about your money.
              </p>
            </div>
          }
        >
          <img
            src={Dashboard}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-0 md:px-6"> {/* Changed px-4 to px-0 */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-800">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 text-blue-600" />}
                title="Expense Tracking"
                description="Easily log and categorize your expenses to understand your spending habits."
              />
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10 text-blue-600" />}
                title="Goal Setting"
                description="Set financial goals and track your progress towards achieving them."
              />
              <FeatureCard
                icon={<PieChart className="h-10 w-10 text-blue-600" />}
                title="Budget Analysis"
                description="Get insights into your financial health with detailed charts and reports."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-blue-100">
          <div className="container px-0 md:px-6"> {/* Changed px-4 to px-0 */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard number={1} title="Sign Up" description="Create your free account in minutes." />
              <StepCard number={2} title="Connect Your Accounts" description="Securely link your bank accounts and credit cards." />
              <StepCard number={3} title="Start Budgeting" description="Set budgets, track expenses, and reach your financial goals." />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-0 md:px-6"> {/* Changed px-0 to remove side margins */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Join thousands of users who have transformed their financial lives with BudgetPro.
                </p>
              </div>
              <button 
                onClick={handleGetStarted} 
                className="inline-flex h-9 items-center justify-center rounded-md bg-white text-blue-600 px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-0 md:px-6 border-t bg-blue-600 text-white">
        <p className="text-xs">© 2024 BudgetPro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#terms">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#privacy">
            Privacy
          </a>
        </nav>
      </footer> */}
    </div>
  );
};

export default Home;