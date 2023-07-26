import React, { useEffect, useState } from 'react';

const ManufacturerList = () => {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8100/api/manufacturers/')
            .then(response => response.json())
            .then(data => setManufacturers(data.manufacturers || []))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Manufacturer List</h1>
            {manufacturers && manufacturers.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers.map((manufacturer, index) => (
                            <tr key={manufacturer.id}>
                                {/* <th scope="row">{index + 1}</th> */}
                                <td>{manufacturer.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No manufacturers found</p>
            )}
        </div>
    );
};

export default ManufacturerList;
