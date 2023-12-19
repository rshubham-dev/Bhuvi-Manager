import React from 'react'

const CreateProjectSchedule = () => {
  return (
    <section className="container mx-auto mt-6 mb-24">
      <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Site</h2>
      <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Site:
          </label>
          <select
          name="site"
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option>Select a Site</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Date:
          </label>
          <input
            type="date"
            name="date"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectScheduleId" className="block text-sm font-medium text-gray-600">
            Schedule ID
          </label>
          <input
            type="text"
            name="projectScheduleId"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectScheduleId" className="block text-sm font-medium text-gray-600">
          Work Detail
          </label>
          <select
          name="workDetail"
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option>Select a Work</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Starting Date:
          </label>
          <input
            type="date"
            name="date"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Project Schedule
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateProjectSchedule