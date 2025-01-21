import React from 'react';
import { Link } from 'react-router-dom';

const AdminTable = ({ data }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          {/* <th>Location</th> */}
          <th>Category</th>
          <th>Total Beds</th>
          <th>Certification</th>
          <th>Details</th>
          {/* Add additional table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            {/* <td>{item.city}, {item.state}</td> */}
            <td>{item.category}</td>
            <td>{item.beds}</td>
            <td>{item.certification}</td>
            <td>
              <Link to={`/city/centre/${item._id}`} className="details-link">
                View Details
              </Link>
            </td>
            {/* Render additional data columns */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
