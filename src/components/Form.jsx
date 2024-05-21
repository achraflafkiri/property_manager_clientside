import React, { useState } from 'react';
import { createProperty } from '../api/functions/properties';
import toast from 'react-hot-toast';

const Form = ({ addNewProperty }) => {
    const [formData, setFormData] = useState({
        address: '',
        rentalCostMonth: '',
        rentalCostAmount: '',
        propertyName: '',
        tag: '',
        contractStartDate: '',
        contractEndDate: '',
        directCostMonth: '',
        directCostAmount: '',
        group: 'Full Property List',
        city: '',
        fixedCost: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rentalCost = { [formData.rentalCostMonth]: formData.rentalCostAmount };
        const directCost = { [formData.directCostMonth]: formData.directCostAmount };

        const propertyData = {
            address: formData.address,
            rentalCost,
            propertyName: formData.propertyName,
            tag: formData.tag,
            contractStartDate: formData.contractStartDate,
            contractEndDate: formData.contractEndDate,
            directCost,
            group: formData.group,
            city: formData.city,
            fixedCost: formData.fixedCost,
        };

        try {
            const response = await createProperty(propertyData);
            if (response.status === 201) {
                addNewProperty(response.data.property);
                setFormData({
                    address: '',
                    rentalCostMonth: '',
                    rentalCostAmount: '',
                    propertyName: '',
                    tag: '',
                    contractStartDate: '',
                    contractEndDate: '',
                    directCostMonth: '',
                    directCostAmount: '',
                    group: 'Full Property List',
                    city: '',
                    fixedCost: '',
                });
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error('Error creating property:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="rentalCostMonth">Rental Cost Month</label>
                <input type="text" className="form-control" id="rentalCostMonth" name="rentalCostMonth" value={formData.rentalCostMonth} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="rentalCostAmount">Rental Cost Amount</label>
                <input type="text" className="form-control" id="rentalCostAmount" name="rentalCostAmount" value={formData.rentalCostAmount} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="propertyName">Property Name</label>
                <input type="text" className="form-control" id="propertyName" name="propertyName" value={formData.propertyName} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="tag">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="contractStartDate">Contract Start Date</label>
                <input type="date" className="form-control" id="contractStartDate" name="contractStartDate" value={formData.contractStartDate} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="contractEndDate">Contract End Date</label>
                <input type="date" className="form-control" id="contractEndDate" name="contractEndDate" value={formData.contractEndDate} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="directCostMonth">Direct Cost Month</label>
                <input type="text" className="form-control" id="directCostMonth" name="directCostMonth" value={formData.directCostMonth} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="directCostAmount">Direct Cost Amount</label>
                <input type="text" className="form-control" id="directCostAmount" name="directCostAmount" value={formData.directCostAmount} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="fixedCost">Fixed Cost</label>
                <input type="number" className="form-control" id="fixedCost" name="fixedCost" value={formData.fixedCost} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn w-45 me-2">Save</button>
            <button type="button" className="btn bg-light w-45" data-bs-dismiss="modal">Close</button>
        </form>
    );
}

export default Form;
