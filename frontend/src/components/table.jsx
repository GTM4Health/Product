import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          {/* <th>Location</th> */}
          <th>Total Beds</th>
          <th>Certification</th>
          {/* Add additional table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            {/* <td>{item.city}, {item.state}</td> */}
            <td>{item.beds}</td>
            <td>{item.certification}</td>
            {/* Render additional data columns */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
