function ModelList(props) {
    return (
    <div className="container-fluid">
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {props.models.map(model => {
            return (
              <tr key={model.id}>
                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td><img src={ model.picture_url } height="350px" width="350px" className="img-thumbnail" alt="{ model.name }"/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    )
  };

  export default ModelList;
