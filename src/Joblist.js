import React, { useState, useEffect } from 'react';

const Joblist = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const response = await fetch('api/complete-guard-jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data.data.records);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (

    <div className="container-sm mt-5">
      <h2 className="mb-4 text-center">Job List</h2>
      <div className="row row-cols-1 row-cols-md-2 g-2 my-3" style={{minWidth:'96rem',marginLeft:'-6rem'}}>
        {jobs.map((job, index) => (
          <div key={index} className="col mb-4" style={{maxWidth:'32rem'}}>
            <div className="card" style={{maxWidth:'30rem'}}>
              <img
                src={job.site_image}
                className="card-img-top img-fluid"
                style={{ height: '200px', objectFit: 'center' }}
                alt={job.site}
              />
              <div className="card-body">
                <h5 className="card-title">{job.site}</h5>
                <p className="card-text">{job.site_address}</p>
                <p className="card-text">Duty Number: {job.duty_number}</p>
                <p className="card-text">Check-in Time: {job.checkin_time}</p>
                <p className="card-text">Check-out Time: {job.checkout_time}</p>
                <a href={job.pdf_bill} className="btn btn-primary">Download PDF</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Joblist;
