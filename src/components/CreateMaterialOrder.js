import React, { useState, useEffect } from 'react';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


const CreateMaterialOrder = () => {
    const [formData, setFormData] = useState({
        supplier: '',
        site: '',
        requirement: [
            {
                material: '',
                quantity: '',
                unit: '',
            },
        ],
    });

    const [sites, setSite] = useState([]);
    const [suppliers, setSupplier] = useState([]);
    const units = ['SQFT', 'RFT', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM', 'BAG', 'KG', 'TONES', 'LITERS'];

    useEffect(() => {

        const fetchSite = async () => {
            try {
                const response = await axios.get('/api/v1/site');
                setSite(response.data)
            } catch (error) {
                toast.error(error.message)
            }
        };

        const fetchSupplier = async () => {
            try {
                const supplierData = await axios.get('/api/v1/Supplier');
                setSupplier(supplierData.data);
            } catch (error) {
                toast.error(error.message)
            }
        }

        fetchSite();
        fetchSupplier();
    }, []);

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleAddWork = () => {
        setFormData({
            ...formData,
            requirement: [
                ...formData.requirement,
                {
                    material: '',
                    quantity: '',
                    unit: '',
                },
            ],
        });
    };

    const handleRemoveWork = (index) => {
        const updatedRequirement = [...formData.requirement];
        updatedRequirement.splice(index, 1);
        setFormData({
            ...formData,
            requirement: updatedRequirement,
        });
    };

    const handleWorkChange = (index, field, value) => {
        const updatedRequirement = [...formData.requirement];
        updatedRequirement[index][field] = value;
        setFormData({
            ...formData,
            requirement: updatedRequirement,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post('/api/v1/material-order/create', formData);
            toast.success(response.data.message)
        } catch (error) {
            console.error('Error submitting work order:', error.message);
            toast.error(error.message)
        }
    };

    return (
        <div className="container mx-auto mt-6 mb-24">
            <form className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4 text-center">Create Purchase Order</h2>

                <div className="mb-4">
                    <label htmlFor="site" className="block text-sm font-semibold text-gray-600">
                        Site
                    </label>
                    <select
                        name="site"
                        value={formData.site}
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={(e) => handleChange('site', e.target.value)}
                    >
                        <option>Site</option>
                        {sites.map((site) => (
                            <option key={site._id} value={site._id}>
                                {site.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="contractorName" className="block text-sm font-semibold text-gray-600">
                        Supplier
                    </label>
                    <select
                        type="text"
                        id="contractor"
                        name="contractor"
                        value={formData.supplier}
                        onChange={(e) => handleChange('supplier', e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option>Contractor</option>
                        {suppliers?.map((supplier) => (
                            <option key={supplier._id} value={supplier._id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Work Details</h2>

                    {formData.requirement.map((material, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <div className="grid grid-cols-2 grid-flow-row-dense gap-4">

                                <div className='col-span-2'>
                                    <label
                                        htmlFor={`work[${index}].material`}
                                        className="block text-sm font-semibold text-gray-600">
                                        Material
                                    </label>
                                    <input
                                        type="text"
                                        // value={workItem.material}
                                        onChange={(e) => handleWorkChange(index, 'material', e.target.value)}
                                        placeholder="Material"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor={`work[${index}].quantity`}
                                        className="block text-sm font-semibold text-gray-600">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        // value={workItem.quantity}
                                        onChange={(e) => handleWorkChange(index, 'quantity', e.target.value)}
                                        placeholder="Quantity"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor={`work[${index}].unit`}
                                        className="block text-sm font-semibold text-gray-600">
                                        Unit
                                    </label>
                                    <select
                                        // value={workItem.unit}
                                        onChange={(e) => handleWorkChange(index, 'unit', e.target.value)}
                                        className="border p-2 rounded w-full">
                                        <option>Select a Unit</option>
                                        {units.map((unit, index) => (
                                            <option key={index} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {formData.requirement.length > 1 && (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveWork(index)}
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddWork}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        More Requirement
                    </button>
                </div>

                <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
                    Submit Purchase Order
                </button>
            </form>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}

export default CreateMaterialOrder;