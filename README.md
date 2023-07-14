# Takehome Assignment

## Goal

Create a React frontend powered by the given Node.js backend that allows users to view, create, and update patients and prescriptions. There are two groups of users that will interact with this tool, as outlined below:

**Provider**

As a provider, I should be able to create new patients and write prescriptions for these patients. I would also like to see my other patients and the status of their previously written prescriptions

**Pharmacist**

As a pharmacist, I should be able to see all prescriptions and move them through the different states (pending, in progress, and filled).

### Requirements

- This front end should make use of [Tailwind](https://tailwindcss.com/) for design and components
- Your code should be written in Typescript
- Both users, Providers and Pharmacists, should be able to complete their respective actions outlined above in this front end

### Technical Design Specifications

Please [see here](https://docs.google.com/document/d/1V6nETQACib7s5o6GzSP0YWYnvvOoDQXKC_VZHLn-ziU/edit?usp=sharing) to learn more about the approach taken in implementing this assignment.

### Installation

Please follow the steps below to run the app:

1. [Ensure npm and node.js are installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Once installed, run `npm install` within the root directory to install the required dependencies.
3. First run `npm run start:backend` to kick off the backend server and then `npm run start`. The app should be reachable at [localhost:3001](http://localhost:3001).
