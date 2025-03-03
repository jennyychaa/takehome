import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../templates/Layout';

const Home = () => {
  return (
    <Layout>
      <h1 className="text-5xl mb-16">Select user type</h1>
      <div className="flex flex-col gap-8">
        <Link
          className="rounded-md bg-rose-200 hover:bg-rose-300 px-8 py-8 text-2xl"
          to="/prescriptions"
        >
          I am a <strong>Pharmacist</strong> 💊
        </Link>
        <Link
          className="rounded-md bg-sky-200 hover:bg-sky-300 px-8 py-8 text-2xl"
          to="/patients"
        >
          I am a <strong>Provider</strong> 🩺
        </Link>
      </div>
    </Layout>
  );
};

export default Home;