import React, { useState } from 'react';

const CustomerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const customer = { first_name: firstName, last_name: lastName, address: address, phone_number: phoneNumber };

        const response = await fetch('http://localhost:8090/api/customers/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        });

        if (response.ok) {
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                <div className="col-sm-10">
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" id="firstName" className="form-control" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" id="lastName" className="form-control" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" id="address" className="form-control" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone Number</label>
                <div className="col-sm-10">
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" id="phoneNumber" className="form-control" required />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Customer</button>
        </form>
    );
};

export default CustomerForm;
