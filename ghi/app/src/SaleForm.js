import React, { useState, useEffect } from 'react';

const SaleForm = () => {
    const [autos, setAutos] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedAuto, setSelectedAuto] = useState('');
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetch('http://localhost:8100/api/automobiles/')
            .then(response => response.json())
            .then(data => setAutos(data.autos.filter(auto => !auto.sold) || [])) // Filter out sold automobiles
            .catch(err => console.log(err));

        fetch('http://localhost:8090/api/salespeople/')
            .then(response => response.json())
            .then(data => setSalespersons(data.salespeople || []))
            .catch(err => console.log(err));

        fetch('http://localhost:8090/api/customers/')
            .then(response => response.json())
            .then(data => setCustomers(data.customers || []))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const sale = { automobile: selectedAuto, salesperson: selectedSalesperson, customer: selectedCustomer, price };

        const response = await fetch('http://localhost:8090/api/sales/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(sale)
        });

        if (response.ok) {
            setSelectedAuto('');
            setSelectedSalesperson('');
            setSelectedCustomer('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="automobile" className="col-sm-2 col-form-label">Automobile</label>
                <div className="col-sm-10">
                    <select value={selectedAuto} onChange={e => setSelectedAuto(e.target.value)} className="form-control" id="automobile" required>
                        <option value="">--Select Automobile--</option>
                        {autos.map(auto => <option key={auto.vin} value={auto.vin}>{auto.vin}</option>)}
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="salesperson" className="col-sm-2 col-form-label">Salesperson</label>
                <div className="col-sm-10">
                    <select value={selectedSalesperson} onChange={e => setSelectedSalesperson(e.target.value)} className="form-control" id="salesperson" required>
                        <option value="">--Select Salesperson--</option>
                        {salespersons.map(person => <option key={person.id} value={person.id}>{person.first_name} {person.last_name}</option>)}
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="customer" className="col-sm-2 col-form-label">Customer</label>
                <div className="col-sm-10">
                    <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)} className="form-control" id="customer" required>
                        <option value="">--Select Customer--</option>
                        {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>)}
                    </select>
                </div>
            <div className="row mb-3 mt-3">
                <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
                 <div className="col-sm-10">
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="form-control" id="price" required />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Sale</button>
        </form>
    );
};

export default SaleForm;