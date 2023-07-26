import React, { useState } from 'react';

function AppointmentForm(props) {
  const [vin, setVin] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tech, setTech] = useState('');
  const [reason, setReason] = useState('');

  function handleVinChange(event) {
    const { value }  = event.target;
    setVin(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleCustomerChange(event) {
    const { value }  = event.target;
    setCustomer(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleDateChange(event) {
    const { value }  = event.target;
    setDate(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleTimeChange(event) {
    const { value }  = event.target;
    setTime(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleTechChange(event) {
    const { value }  = event.target;
    setTech(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleReasonChange(event) {
    const { value }  = event.target;
    setReason(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      vin: vin,
      customer: customer,
      // Setting time zone to MST
      date_time: `${date}T${time}-07:00`,
      technician: tech,
      reason: reason,

    };

    const locationUrl = `http://localhost:8080/api/appointments/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();
      console.log(newAppointment);
      setVin('');
      setCustomer('');
      setDate('');
      setTime('');
      setTech('');
      setReason('');
      let successMessage = document.getElementById('create-success');
      successMessage = successMessage.classList.remove('d-none');
      props.getAppts()
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="add-appt-form">
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} required type="text" id="vin" className="form-control" required />
              <label htmlFor="vin" className="form-label">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleCustomerChange} value={customer} required type="text" id="customer" className="form-control" required />
              <label htmlFor="customer" className="form-label">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleDateChange} value={date} type="date" id="date" className="form-control" required />
              <label htmlFor="date" className="form-label">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleTimeChange} value={time} type="time" id="time" className="form-control" required />
              <label htmlFor="time" className="form-label">Time</label>
            </div>
            <div className="mb-3">
              <select onChange={handleTechChange} value={tech} required className="form-select" id="tech">
                <option value="">Choose a technician...</option>
                {props.techs.map(tech => {
                  return (
                    <option key={tech.id} value={tech.id}>{tech.first_name} {tech.last_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleReasonChange} value={reason} type="text" id="reason" className="form-control" required />
              <label htmlFor="reason" className="form-label">Reason</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className="alert alert-success alert-dismissible d-none fade show" role="alert" id="create-success" >
          <strong>Success:</strong> A new appointment has been created.
          </div>
        </div>
      </div>
    </div>
  );
}
  export default AppointmentForm;
