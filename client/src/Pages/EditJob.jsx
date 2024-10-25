import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getJobByIdAPI, updateJobAPI } from '../APIServices/jobAPI.js';
import { useNavigate, useParams } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';

export default function EditJob() {
    const { jobId } = useParams();

    const navigate = useNavigate();

    const [jobData, setFormData] = useState({
        jobTitle: '',
        description: '',
        qualifications: '',
        responsibility: '',
        location: '',
        salaryRange: '',
        companyName: ''
    });

    const { data: job, isLoading } = useQuery({
        queryKey: ['my-jobs'],
        queryFn: () => getJobByIdAPI(jobId)
    })

    const updateMutation = useMutation({
        mutationKey: ['update-job'],
        mutationFn: () => updateJobAPI(jobId, jobData),
    });
    const { isPending: updatePending } = updateMutation;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...jobData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation
            .mutateAsync()
            .then(() =>toast.success('Job updated successfully'))
            .then(() => navigate('/view-jobs'))
            .catch((error) => { console.log(error) });
    };

    useEffect(() => {
        if (job) {
            setFormData({
                jobTitle: job.jobTitle,
                description: job.description,
                qualifications: job.qualifications,
                responsibility: job.responsibility,
                location: job.location,
                salaryRange: job.salaryRange,
                companyName: job.companyName
            });
        }
    }, [job]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md my-24">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Job</h2>
            {isLoading ? (
                <div className="py-12">
                    <ImSpinner8 className='w-20 h-20 mx-auto text-gray-700 animate-spin ' />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Title:</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={jobData.jobTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name of Company/Organization:</label>
                        <input
                            type="text"
                            name="companyName"
                            value={jobData.companyName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Qualifications:</label>
                        <textarea
                            name="qualifications"
                            value={jobData.qualifications}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Responsibility:</label>
                        <textarea
                            name="responsibility"
                            value={jobData.responsibility}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={jobData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salary Range(optional):</label>
                        <input
                            type="text"
                            name="salaryRange"
                            value={jobData.salaryRange}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="text-center">
                        {updatePending ? (
                            <ImSpinner8 className="w-8 h-8 mx-auto text-gray-700 animate-spin" />
                        ) : (
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        )}
                        
                    </div>
                </form>
            )}
        </div>
    );
}