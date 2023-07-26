import React, { useState, useEffect } from 'react';

const AutomobileForm = () => {
    const [models, setModels] = useState([]);
    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [year, setYear] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8100/api/models/')
            .then(response => response.json())
            .then(data => setModels(data.models || []))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const automobile = { vin, color, model_id: selectedModel, year };

        const response = await fetch('http://localhost:8100/api/automobiles/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(automobile)
        });

        if (response.ok) {
            setVin('');
            setColor('');
            setSelectedModel('');
            setYear('');
            setErrorMessage('');
        } else {
            setErrorMessage('Could not create the automobile');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="row mb-3">
                <label htmlFor="vin" className="col-sm-2 col-form-label">VIN</label>
                <div className="col-sm-10">
                    <input type="text" value={vin} onChange={e => setVin(e.target.value)} className="form-control" id="vin" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="color" className="col-sm-2 col-form-label">Color</label>
                <div className="col-sm-10">
                    <input type="text" value={color} onChange={e => setColor(e.target.value)} className="form-control" id="color" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="model" className="col-sm-2 col-form-label">Model</label>
                <div className="col-sm-10">
                    <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} className="form-control" id="model" required>
                        <option value="">--Select Model--</option>
                        {models.map(model => <option key={model.id} value={model.id}>{model.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="year" className="col-sm-2 col-form-label">Year</label>
                <div className="col-sm-10">
                    <input type="number" value={year} onChange={e => setYear(e.target.value)} className="form-control" id="year" required />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Automobile</button>
        </form>
    );
};

export default AutomobileForm;
