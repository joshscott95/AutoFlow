function AppointmentList(props) {

  async function cancelAppt(event) {
    const id=event.target.value
    const locationUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
    const fetchConfig = {
      method: "put"}
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      props.getAppts()
    }}

  async function finishAppt(event) {
    const id=event.target.value
    const locationUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
    const fetchConfig = {
        method: "put"}
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
        props.getAppts()
      }}

  const appointments = props.appts.filter(appt => appt.status == "created")
  for(const appointment of appointments){
    let tempDate = new Date(appointment.date_time)
    appointment["date"] = `${tempDate.getMonth()+1}/${tempDate.getDate()}/${tempDate.getFullYear()}`
    // Display time in MST
    appointment["time"] = `${tempDate.toLocaleTimeString('en-US')}`
    }

  return (
    <div className="container-fluid">
      <h1>Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => {
            return (
              <tr key={appt.id}>
                <td>{ appt.vin }</td>
                <td>{ appt.vip }</td>
                <td>{ appt.customer }</td>
                <td>{ appt.date }</td>
                <td>{ appt.time }</td>
                <td>{ appt.technician.first_name } {appt.technician.last_name}</td>
                <td>{ appt.reason }</td>
                <td><button onClick={cancelAppt} className="btn btn-danger" value={appt.id}>Cancel</button></td>
                <td><button onClick={finishAppt} className="btn btn-success" value={appt.id}>Finish</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
  };

  export default AppointmentList;
