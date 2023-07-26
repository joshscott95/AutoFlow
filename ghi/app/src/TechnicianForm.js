import React, { useState } from 'react';

function TechnicianForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  function handleFirstNameChange(event) {
    const { value }  = event.target;
    setFirstName(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');

  }

  function handleLastNameChange(event) {
    const { value }  = event.target;
    setLastName(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleEmployeeIdChange(event) {
    const { value }  = event.target;
    setEmployeeId(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    const locationUrl = `http://localhost:8080/api/technicians/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();
      console.log(newTechnician);
      setFirstName('');
      setLastName('');
      setEmployeeId('');
      let successMessage = document.getElementById('create-success');
      successMessage = successMessage.classList.remove('d-none');
      props.getTechs();
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Technician</h1>
          <form onSubmit={handleSubmit} id="add-tech-form">
            <div className="form-floating mb-3">
              <input onChange={handleFirstNameChange} value={firstName} required type="text" id="firstName" className="form-control" required />
              <label htmlFor="firstName">First name...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleLastNameChange} value={lastName} required type="text" id="lastName" className="form-control" required />
              <label htmlFor="lastName">Last name...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleEmployeeIdChange} value={employeeId} type="text" id="employeeId" className="form-control" required />
              <label htmlFor="employeeId">Employee ID...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className="alert alert-success alert-dismissible d-none fade show" role="alert" id="create-success" >
          <strong>Success:</strong> A new technician has been created.
          </div>
        </div>
      </div>
    </div>
  );
}
  export default TechnicianForm;
