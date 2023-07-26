import React, { useState } from 'react';

function ModelForm(props) {
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  function handleNameChange(event) {
    const { value }  = event.target;
    setName(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');

  }

  function handlePictureUrlChange(event) {
    const { value }  = event.target;
    setPictureUrl(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  function handleManufacturerChange(event) {
    const { value }  = event.target;
    setManufacturer(value);
    let successMessage = document.getElementById('create-success');
    successMessage = successMessage.classList.add('d-none');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: name,
      picture_url: pictureUrl,
      manufacturer_id: manufacturer,
    };

    const locationUrl = `http://localhost:8100/api/models/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newModel = await response.json();
      console.log(newModel);
      setName('');
      setPictureUrl('');
      setManufacturer('');
      let successMessage = document.getElementById('create-success');
      successMessage = successMessage.classList.remove('d-none');
      props.getModels();
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit} id="add-model-form">
            <div className="form-floating mb-3">
              <input onChange={handleNameChange} value={name} required type="text" id="name" className="form-control" required />
              <label htmlFor="name">Model name...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handlePictureUrlChange} value={pictureUrl} required type="text" id="pictureUrl" className="form-control" required />
              <label htmlFor="pictureUrl">Picture URL...</label>
            </div>
            <div className="mb-3">
              <select onChange={handleManufacturerChange} value={manufacturer} required className="form-select" id="manufacturer">
                <option value="">Choose a manufacturer...</option>
                {props.manufacturers.map(manufacturer => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className="alert alert-success alert-dismissible d-none fade show" role="alert" id="create-success" >
          <strong>Success:</strong> A new automobile model has been created.
          </div>
        </div>
      </div>
    </div>
  );
}
  export default ModelForm;
