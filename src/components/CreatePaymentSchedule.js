import React from 'react'

const CreatePaymentSchedule = () => {
  return (
    <section className="container mx-auto mt-6 mb-24">
    <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-center">Create Site</h2>
    <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
        Select a Site
        </label>
        <select
        name="site"
        required
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option>Site</option>
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
          <label htmlFor="client" className="block text-sm font-medium text-gray-600">
            Choose Client
          </label>
          <select name="client" required className="mt-1 p-2 w-full border rounded-md">
            <option>Client</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="contractor" className="block text-sm font-medium text-gray-600">
            Choose Contractor
          </label>
          <select name="client" required className="mt-1 p-2 w-full border rounded-md">
            <option>Contractor</option>
          </select>
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
      <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Details</h2>

            <div className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Work Detail
                  </label>
                  <select
                    className="border p-2 rounded w-full"
                  >
                    <option disabled>
                      Select Work Detail
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Rate
                  </label>
                  <input
                    type="number"
                    placeholder="Rate"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Area
                  </label>
                  <input
                    type="number"
                    placeholder="Area"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    name='dateOfPayment'
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label  className="block text-sm font-semibold text-gray-600">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label  className="block text-sm font-semibold text-gray-600">
                    Bill No
                  </label>
                  <input
                    type="text"
                    placeholder="billNo"
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>
            <div className="text-right">
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Work
          </button>
          </div>
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

export default CreatePaymentSchedule