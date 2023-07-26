import React, { useEffect, useState } from 'react';

const AutomobileList = () => {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchAutomobiles = () => {
        fetch('http://localhost:8100/api/automobiles/')
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Check what data is returned from your API
                setAutomobiles(data.autos || [])
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchAutomobiles();
    }, []);

    return (
        <div>
            <h1>Automobile Inventory</h1>
            {automobiles && automobiles.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">VIN</th>
                            <th scope="col">Make</th>
                            <th scope="col">Model</th>
                            <th scope="col">Year</th>
                            {/* <th scope="col">Price</th> */}
                            <th scope="col">Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {automobiles.map((auto, index) => (
                            <tr key={auto.vin}>
                                <th scope="row">{index + 1}</th>
                                <td>{auto.vin}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.year}</td>
                                {/* <td>{auto.price || 'N/A'}</td> */}
                                <td>{auto.sold ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No automobiles found</p>
            )}
        </div>
    );
};

export default AutomobileList;
