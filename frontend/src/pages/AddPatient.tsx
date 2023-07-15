import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../templates/Layout';

const AddPatient = () => {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const savePatientData = async (
    firstName: string,
    lastName: string,
    prescriptions: string,
    notes?: string,
  ) => {
    setIsSaving(true);

    console.log({firstName}, {lastName}, {prescriptions}, {notes})

    fetch('http://localhost:3000/patients', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        prescriptions,
        notes: notes || '',
      }),
    })
      .then(response => {
        console.log({response})

        if (!response.ok) {
          throw new Error('There was an issue saving the patients data...');
        }
        return response.json();
      })
      .then(() => {
        navigate('/patients');
      })
      .catch(error => {
        console.error(error);
      });

    setIsSaving(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const t = e.target;
    // @ts-expect-error
    const firstName = t.firstName.value;
    // @ts-expect-error
    const lastName = t.lastName.value;
    // @ts-expect-error
    const prescriptions = t.prescriptions.value;
    // @ts-expect-error
    const notes = t.notes.value;

    savePatientData(firstName, lastName, prescriptions, notes);
  };

  console.log({isSaving})

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-16">
        <Link className="block text-sm text-gray-500" to="/">Home</Link>
        <span className="text-xs text-gray-500">/</span>
        <Link className="block text-sm text-gray-500" to="/patients">Patients</Link>
      </div>
      <h1 className="text-5xl mb-16">Add New Patient</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-8">
          <label htmlFor="firstName">First Name</label>
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="firstName"
            name="firstName"
            required
            type="text"
          />
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="lastName"
            name="lastName"
            required
            type="text"
          />
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <label htmlFor="prescriptions">Prescriptions</label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="prescriptions"
            name="prescriptions"
            required
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="notes"
            name="notes"
            rows={3}
          />
        </div>
        <button
          className="block rounded-md bg-indigo-500 hover:bg-indigo-600 px-5 py-2 text-white"
          type="submit"
          disabled={isSaving}
        >
          Save
        </button>
      </form>
    </Layout>
  );
};

export default AddPatient;