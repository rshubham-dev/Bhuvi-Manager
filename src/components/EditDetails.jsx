// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate, useParams } from 'react-router-dom';

// const EditDetails = () => {
//   const [data, setData] = useState();
//   const navigate = useNavigate();
//   const [projectToEdit, setProjectToEdit] = useState({
//     id: '',
//     index: '',
//   });
//   const status = ['Started', 'Completed', 'Pending', 'Partaly Completed'];
//   const [projectDetail, setProjectDetail] = useState({
//     workDetail: '',
//     toStart: '',
//     startedAt: '',
//     difference: '',
//     reason: '',
//     status: '',
//   })
//   const [workDetails, setWorkDetails] = useState([]);
//   const { projectIndex } = useParams();
//   const { projectId } = useParams();
//   console.log(projectIndex)
//   console.log(projectId)

//   useEffect(() => {
//     setProjectToEdit({
//       id: projectId,
//       index: projectIndex
//     })
//     fetchProjectDetail(projectId, projectIndex)

//     const fetchWork = async () => {
//       try {
//         const title = 'Project Schedule';
//         const workData = await axios.post('/api/v1/work-details/name', {
//           title
//         });
//         setWorkDetails(workData.data.description);
//       } catch (error) {
//         console.log('Error fetching work details:', error.message);
//         toast.error(error.message);
//       }
//     };
//     fetchWork()
//   }, [])



//   const fetchProjectDetail = async (id, index) => {
//     try {
//       const response = await axios.get(`/api/v1/project-schedule/${id}/projectDetails`);
//       const detail = response.data[index];
//       console.log(detail)
//       setProjectDetail({
//         workDetail: detail.workDetail,
//         toStart: detail.toStart,
//         startedAt: detail.startedAt,
//         difference: detail.difference,
//         reason: detail.reason,
//         status: detail.status,
//       });
//     } catch (error) {
//       console.log('Error fetching user details:', error);
//     }
//   };

//   const handleUpdate = (field, value) => {
//     setProjectDetail({
//       ...projectDetail,
//       [field]: value
//     })
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         console.log(projectDetail)
//         await axios.put(`/api/v1/project-schedule/${projectToEdit.id}/projectDetails/${projectToEdit.index}`, projectDetail);
//         toast.success('Edited successfully');
//         navigate(-1);
//     } catch (error) {
//       console.error('Error submitting user data:', error);
//       toast.error(error.response?.data?.message || 'An error occurred');
//     }
//   };

//   return (
//     <main>
//       <section className="flex items-center justify-center max-h-screen mb-24 mt-10">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">

//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
//               Work:
//             </label>
//             <select
//               onChange={(e) => handleUpdate('workDetail', e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option>
//                 {projectToEdit ? projectDetail.workDetail :
//                 'Select Work Detail:'
//                 }
//               </option>
//               {workDetails.map((workDetail) => (
//                 <option key={workDetail._id} value={workDetail.work}>
//                   {workDetail.work}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="userMail" className="block text-gray-700 text-sm font-bold mb-2">
//               Starting Date: {projectDetail.toStart}
//             </label>
//             <input
//               type="date"
//               name="toStart"
//               onChange={(e) => handleUpdate('toStart', e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Actual Starting Date: {projectDetail.startedAt}
//             </label>
//             <input
//               type="date"
//               name="startedAt"
//               onChange={(e) => handleUpdate('startedAt', e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
//               Difference: 
//             </label>
//             <input
//               type="text"
//               name="difference"
//               onChange={(e) => handleUpdate('difference', e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
//               Reason
//             </label>
//             <input
//               type="text"
//               onChange={(e) => handleUpdate('reason', e.target.value)}
//               name="reason"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
//               Status
//             </label>
//             <select
//               onChange={(e) => handleUpdate('status', e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option>
//               {projectToEdit ? projectDetail.status :
//                 'Status'
//                 }
//                 </option>
//               {status.map((status, index) => (
//                 <option key={index} value={status}>{status}</option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Submit
//           </button>
//         </form>
//         <Toaster
//           position="top-right"
//           reverseOrder={false}
//         />
//       </section>
//     </main>
//   )
// }

// export default EditDetails;