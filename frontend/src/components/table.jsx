import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          {/* Add additional table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            {/* Render additional data columns */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
