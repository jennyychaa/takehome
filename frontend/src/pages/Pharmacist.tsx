import React, { useEffect, useState } from 'react';
import { PrescriptionData } from '@photon-health/models';

import Layout from '../templates/Layout';
import Loader from '../components/Loader';

const SORT_ORDER = {
  'PENDING': 0,
  'IN_PROGRESS': 1,
  'FILLED': 2,
};

const Pharmacist = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [prescriptions, setPrescriptions] = useState<Array<PrescriptionData> | undefined>(undefined);

  const getPrescriptionsData = async () => {
    setIsLoading(true);

    fetch('http://localhost:3000/prescriptions')
      .then(response => {
        if (!response.ok) {
          throw new Error('There was an issue fetching the prescriptions data...');
        }
        return response.json();
      })
      .then(data => {
        data.sort((a: PrescriptionData, b: PrescriptionData) => SORT_ORDER[a.status] - SORT_ORDER[b.status]);
        setPrescriptions(data);
      })
      .catch(error => {
        console.error(error);
      });

    setIsLoading(false);
  };

  const savePrescriptionsData = async (id: string, status: string) => {
    setIsSaving(true);

    fetch(`http://localhost:3000/prescriptions/status/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        status
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('There was an issue saving the prescriptions data...');
        }
        return response.json();
      })
      .then(data => {
        data.sort((a: PrescriptionData, b: PrescriptionData) => SORT_ORDER[a.status] - SORT_ORDER[b.status]);
        setPrescriptions(data);
      })
      .catch(error => {
        console.error(error);
      });

    setIsSaving(false);
  };

  useEffect(() => {
    getPrescriptionsData();
  }, []);

  return (
    <Layout>
      <h1 className="text-5xl mb-16">Prescriptions</h1>
      {isLoading || isSaving || prescriptions === undefined ? <Loader /> :
        prescriptions.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">Prescription</th>
                <th className="border-b p-4 text-left">Patient Name</th>
                <th className="border-b p-4 text-left">Status</th>
                <th className="border-b p-4 text-left">Additional Notes</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(({ id, medications, notes, patientInfo, status }) => (
                <tr key={id}>
                  <td className="border-b p-4 text-sm">{medications}</td>
                  <td className="border-b p-4 text-sm">{`${patientInfo.firstName} ${patientInfo.lastName}`}</td>
                  <td className="border-b p-4 text-sm">
                    <select
                      aria-label="Select prescription status"
                      className="block w-full text-sm"
                      defaultValue={status}
                      onChange={(e) => savePrescriptionsData(id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="FILLED">Filled</option>
                    </select>
                  </td>
                  <td className="border-b p-4 text-sm">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <div>No prescription data is availabile.</div>
      }
    </Layout>
  );
};

export default Pharmacist;