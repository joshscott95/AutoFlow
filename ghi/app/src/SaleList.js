import React, { useState, useEffect } from 'react';

const SaleList = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/api/sales/')
            .then(response => response.json())
            .then(data => setSales(data.sales || []))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Sales</h1>
            {sales.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Automobile VIN</th>
                            <th scope="col">Salesperson Name</th>
                            <th scope="col">Employee Number</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={sale.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No sales found</p>
            )}
        </div>
    );
};

export default SaleList;