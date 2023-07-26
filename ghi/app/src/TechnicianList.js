function TechnicianList(props) {
    return (
    <div className="container-fluid">
      <h1>Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {props.techs.map(tech => {
            return (
              <tr key={tech.id}>
                <td>{ tech.employee_id }</td>
                <td>{ tech.first_name }</td>
                <td>{ tech.last_name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    )
  };

  export default TechnicianList;
