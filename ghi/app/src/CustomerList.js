import React, { useState, useEffect } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/api/customers/')
            .then(response => response.json())
            .then(data => {
                if (data.customers) {
                    setCustomers(data.customers);
                } else {
                    console.log('Could not retrieve customers');
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            {customers && customers.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers found</p>
            )}
        </div>
    );
};

export default CustomerList;
