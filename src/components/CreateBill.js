import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateBill = () => {
  const [sites, setSite] = useState([]);
  const [contractors, setContractor] = useState([]);
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    const getsites = async ()=>{
      try {
        const sitesData = await axios.get('/api/v1/site');
        setSite(sitesData.data);

      } catch (error) {
        toast.error(error.error)
      }
    }
    const getcontractors = async () => {
      try {
        const contractorsData = await axios.get('/api/v1/contractor');
        setContractor(contractorsData.data);
      } catch (error) {
        toast.error(error.error)
      }
    }
    const getemployees = async () => {
      try {
        const employeesData = await axios.get('/api/v1/employee');
        setEmployee(employeesData.data);
      } catch (error) {
        toast.error(error.error)
      }
    }

    getsites();
    getcontractors();
    getemployees();
  },[])
  console.log(sites);
  
  return (
    <main>
      <section className='bill-creation'>
        <h1>Bill</h1>
        <form>
          <div>
            <label htmlFor='site'>Site</label>
            <select name='site' required>
              <option>Site</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='contractor'>
              Contractor
            </label>
            <select name='contractor'>
              <option>Contractor</option>
              {contractors.map((contractor) => (
                <option key={contractor._id} value={contractor._id}>
                  {contractor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='creater'>Bill By</label>
            <select name='createdBy'>
              <option>Bill by</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='billNo'>Bill No</label>
            <input
            type='string'
            name='billNo'
            required
            autoComplete='false'
            placeholder='Enter Bill No Here'
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
            type='date'
            name='date'
            required
            />
          </div>
          <div>
            <label htmlFor=''></label>
          </div>
        </form>
      </section>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </main>
  )
}

export default CreateBill