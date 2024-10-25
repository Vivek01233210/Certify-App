import { useState } from "react";
import { formatDate } from "../utility/dateFormatter.js";
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteJobAPI, getMyJobsAPI } from "../APIServices/jobAPI.js";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";

export default function ViewJobList() {

    const [showModal, setShowModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    const { data: jobs, isLoading: jobsLoading, refetch } = useQuery({
        queryKey: ['my-jobs'],
        queryFn: getMyJobsAPI
    });

    // console.log(jobs);

    const deleteMutation = useMutation({
        mutationKey: ["delete-job"],
        mutationFn: deleteJobAPI,
    });

    const { isPending: deletePending } = deleteMutation;

    const handleDeleteClick = (job) => {
        setJobToDelete(job);
        setShowModal(true);
    };

    const confirmDelete = () => {
        deleteMutation
            .mutateAsync(jobToDelete?._id)
            .then(() => {
                setJobToDelete(null);
                setShowModal(false);
                toast.success('Job deleted successfully');
                refetch();
            });
    };

    const cancelDelete = () => {
        setShowModal(false);
        setJobToDelete(null);
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">Posted jobs</h1>
            <div className="space-y-4">
                {jobsLoading && (
                    <div className="py-20">
                        <ImSpinner8 className="w-12 h-12 text-gray-700 animate-spin mx-auto" />
                    </div>
                )}
                {jobs?.data?.length===0 && <h3>You haven't posted any jobs yet!</h3>}
                {jobs?.data?.map((job) => (
                    <div key={job?._id} className="p-4 border rounded shadow-sm">
                        <h2 className="text-xl font-semibold">{job?.jobTitle}</h2>
                        <p className="text-gray-600">{job?.location}</p>
                        <p className="text-gray-600">{job?.salaryRange}</p>
                        <p className="text-gray-600">{job?.description}</p>
                        <p className="">No. of applicants: {job?.applicants?.length}</p>
                        <p className="text-gray-500 text-sm">Posted on: {formatDate(job?.createdAt)}</p>
                        <div className="mt-4 flex space-x-2">
                            <Link to={`/view-jobs/edit-job/${job?._id}`}
                                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">
                                Edit
                            </Link>
                            <button
                                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                                onClick={() => handleDeleteClick(job)}
                            >
                                Delete
                            </button>
                            <Link to={`/view-jobs/${job?._id}`}
                                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded"
                            >Show Applicants
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete the job "
                            <span className="font-bold">{jobToDelete.jobTitle}</span>"?
                        </p>
                        {deletePending ? <ImSpinner8 className="py-2 w-8 h-8 animate-spin" /> : (
                            <div className="mt-4 flex space-x-2">
                                <button
                                    className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                                    onClick={confirmDelete}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
                                    onClick={cancelDelete}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};