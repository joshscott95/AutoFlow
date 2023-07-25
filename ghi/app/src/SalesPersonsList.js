import React, { useState, useEffect } from 'react';

const SalesPersonList = () => {
    const [salespeople, setSalespeople] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/api/salespeople/')
            .then(response => response.json())
            .then(data => {
                if (data.salespeople) {
                    setSalespeople(data.salespeople);
                } else {
                    console.log('Could not retrieve salespersons');
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>SalesPeople</h1>
            {salespeople && salespeople.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Employee ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeople.map((salesperson, index) => (
                            <tr key={salesperson.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                                <td>{salesperson.employee_id}</td>
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

export default SalesPersonList;
