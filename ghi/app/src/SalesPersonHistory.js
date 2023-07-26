import React, { useState, useEffect } from 'react';

const SalesPersonHistory = () => {
    const [salespersons, setSalespersons] = useState([]);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/api/salespeople/')
            .then(response => response.json())
            .then(data => setSalespersons(data.salespeople || []))
            .catch(err => console.log(err));

        fetch('http://localhost:8090/api/sales/')
            .then(response => response.json())
            .then(data => setSales(data.sales || []))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Salespeople History</h1>
            {salespersons && salespersons.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Sales History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespersons.map((salesperson, index) => (
                            <tr key={salesperson.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                                <td>{salesperson.employee_id}</td>
                                <td>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Automobile VIN</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sales.filter(sale => sale.salesperson.id === salesperson.id).map(sale => (
                                                <tr key={sale.id}>
                                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                                    <td>{sale.automobile.vin}</td>
                                                    <td>{sale.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No salespersons found</p>
            )}
        </div>
    );
};

export default SalesPersonHistory;
