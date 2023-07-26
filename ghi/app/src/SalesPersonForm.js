import React, { useState } from 'react';

const SalesPersonForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const salesperson = { first_name: firstName, last_name: lastName, employee_id: employeeId };

        const response = await fetch('http://localhost:8090/api/salespeople/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(salesperson)
        });

        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
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
                <label htmlFor="employeeId" className="col-sm-2 col-form-label">Employee ID</label>
                <div className="col-sm-10">
                    <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} placeholder="Employee ID" id="employeeId" className="form-control" required />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Salesperson</button>
        </form>
    );
};

export default SalesPersonForm;
