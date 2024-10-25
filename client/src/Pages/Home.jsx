import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Section */}
      <header className="bg-indigo-600 text-white py-12 -mt-2">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
          <p className="text-lg mb-6">Find your dream job or the perfect candidate with ease.</p>
          {!isAuthenticated &&
            <Link to="/register" className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Get Started
            </Link>
          }
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Job Search</h3>
              <p className="text-gray-700">Easily search for jobs that match your skills and preferences.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Apply Online</h3>
              <p className="text-gray-700">Submit your applications directly through our platform.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Employer Search</h3>
              <p className="text-gray-700">Employers can find the best candidates for their job openings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-700 mb-4">"This platform helped me find my dream job in just a few weeks!"</p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" alt="User 1" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-xl font-semibold">John Doe</h4>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-700 mb-4">"A fantastic resource for employers looking for top talent."</p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" alt="User 2" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-xl font-semibold">Jane Smith</h4>
                  <p className="text-gray-500">HR Manager</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-700 mb-4">"The application process was smooth and straightforward."</p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" alt="User 3" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-xl font-semibold">Alice Johnson</h4>
                  <p className="text-gray-500">Marketing Specialist</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-700 mb-4">"I found the perfect candidate for our open position within days."</p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" alt="User 4" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-xl font-semibold">Michael Brown</h4>
                  <p className="text-gray-500">Recruiter</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-700 mb-4">"Highly recommend this platform for job seekers and employers alike."</p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" alt="User 5" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-xl font-semibold">Emily Davis</h4>
                  <p className="text-gray-500">Project Manager</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-700 mb-4">"A user-friendly platform with excellent support."</p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" alt="User 6" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-xl font-semibold">David Wilson</h4>
                  <p className="text-gray-500">Business Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-6">Join us today and take the first step towards your dream job or finding the perfect candidate.</p>
          {!isAuthenticated &&
            <Link to="/register" className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Register Now
            </Link>
          }
        </div>
      </section>
    </div>
  );
}