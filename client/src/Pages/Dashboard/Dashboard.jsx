import { Navigate } from 'react-router-dom';
import JobSeekerDash from './JobSeekerDash.jsx';
import EmployerDash from './EmployerDash.jsx';
import { checkUserAPI } from '../../APIServices/userAPI.js';
import { useQuery } from '@tanstack/react-query';
import { ImSpinner8 } from 'react-icons/im';

export default function Dashboard() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['check-user'],
        queryFn: checkUserAPI,
    })

    if (isError) return <Navigate to='/login' />

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <ImSpinner8 className="w-20 h-20 text-gray-700 animate-spin mx-auto" />
        </div>
    );

    if (data?.isAuthenticated && data?.user?.role === 'job-seeker') {
        return <JobSeekerDash />
    } else if (data?.isAuthenticated && data?.user.role === 'employer') {
        return <EmployerDash />
    } else {
        return <Navigate to="/dashboard" />
    }
}