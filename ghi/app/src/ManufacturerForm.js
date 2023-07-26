import React, { useState } from 'react';

const ManufacturerForm = () => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const manufacturer = { name };

        const response = await fetch('http://localhost:8100/api/manufacturers/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(manufacturer)
        });

        if (response.ok) {
            setName('');
            setErrorMessage('');
        } else {
            setErrorMessage('Could not create the manufacturer');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label">Manufacturer name</label>
                <div className="col-sm-10">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" id="name" required />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Create Manufacturer</button>
        </form>
    );
};

export default ManufacturerForm;
