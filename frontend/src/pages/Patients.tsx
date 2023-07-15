import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PatientData } from '@photon-health/models';

import Layout from '../templates/Layout';
import Loader from '../components/Loader';

const Patients = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<Array<PatientData> | undefined>(undefined);

  const getPatientsData = async () => {
    setIsLoading(true);

    fetch('http://localhost:3000/patients')
      .then(response => {
        if (!response.ok) {
          throw new Error('There was an issue fetching the patients data...');
        }
        return response.json();
      })
      .then(data => {
        data.sort((a: PatientData, b: PatientData) => {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;

          return 0;
        });
        setPatients(data);
      })
      .catch(error => {
        console.error(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getPatientsData();
  }, []);

  return (
    <Layout>
      <Link className="block text-sm mb-16 text-gray-500" to="/">Home</Link>
      <div className="flex justify-between items-center gap-8 mb-16">
        <h1 className="text-5xl">Patient Data</h1>
        <Link
          className="block rounded-md bg-indigo-500 hover:bg-indigo-600 px-4 py-4 text-sm text-white"
          to="/patient/add"
        >
          Add New Patient
        </Link>
      </div>
      {isLoading || patients === undefined ? <Loader /> :
        patients.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">Last Name</th>
                <th className="border-b p-4 text-left">First Name</th>
                <th className="border-b p-4 text-left">Prescriptions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(({ id, firstName, lastName, prescriptions }) => (
                <tr key={id}>
                  <td className="border-b p-4 text-sm">{lastName}</td>
                  <td className="border-b p-4 text-sm">{firstName}</td>
                  <td className="border-b p-4 text-sm">{prescriptions.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <div>No patient data is availabile.</div>
      }
    </Layout>
  );
};

export default Patients;