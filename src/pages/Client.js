import React from 'react'

const Clients = () => {
  return (
    <div className="overflow-x-auto">
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          <th className="border border-violet-600 px-4 py-2 text-left">ID</th>
          <th className="border border-violet-600 px-4 py-2 text-left">Title</th>
          <th className="border border-violet-600 px-4 py-2 text-left">Tags</th>
          <th className="border border-violet-600 px-4 py-2 text-left">Status</th>
          <th className="border border-violet-600 px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-violet-600 px-4 py-2">1</td>
          <td className="border border-violet-600 px-4 py-2">Lorem ipsum dolor sit amet</td>
          <td className="border border-violet-600 px-4 py-2">Develop</td>
          <td className="border border-violet-600 px-4 py-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
              Develop
            </span>
          </td>
          <td className="border border-violet-600 px-4 py-2">
            <div className="flex items-center gap-2">
              <a href="#">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
               >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
               </svg>
              </a>
              <a href="#">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
               >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
               </svg>
              </a>
              <a href="#">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
               >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
               </svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Clients