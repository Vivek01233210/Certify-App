import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file!');
      return;
    }

    // console.log(file)

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/v1/file-upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || 'File uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error:', error);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Section */}
      <header className="bg-indigo-600 text-white py-12 -mt-2">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Certify</h1>
          <p className="text-lg mb-6">Streamline the process of issuing and verifying internship certificates.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/login" className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Easy Upload</h3>
              <p className="text-gray-700">Admins can easily upload student data via Excel sheets.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quick Verification</h3>
              <p className="text-gray-700">Students can quickly verify their certificates using their certificate ID.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Download Certificates</h3>
              <p className="text-gray-700">Students can download their certificates with all relevant information prefilled.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}