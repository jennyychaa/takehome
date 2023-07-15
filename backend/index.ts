import express, { Request, Response } from "express";
import cors from 'cors'
import { v4 as uuidv4 } from "uuid";
import { Patient, Prescription, PrescriptionData, PrescriptionStatus } from '@photon-health/models';

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
interface Database {
  patients: Record<string, Patient>;
  prescriptions: Record<string, Prescription>;
}

const database: Database = {
  patients: {
    '0': {
      id: '0',
      firstName: 'Elizabeth',
      lastName: 'Blackwell',
    },
    '1': {
      id: '1',
      firstName: 'Edward',
      lastName: 'Jenner',
    }
  },
  prescriptions: {
    '0': {
      id: '0',
      patientId: '0',
      status: PrescriptionStatus.Filled,
      medications: 'Drug C, 500mg',
      notes: 'Must take 2 times a day for 10 days with food.',
    },
    '1': {
      id: '1',
      patientId: '0',
      status: PrescriptionStatus.Pending,
      medications: 'Drug B, 100mg',
      notes: '',
    },
    '2': {
      id: '2',
      patientId: '0',
      status: PrescriptionStatus.InProgress,
      medications: 'Drug A, 250mg',
      notes: 'Must take 3 times a day for 7 days.',
    },
    '3': {
      id: '3',
      patientId: '1',
      status: PrescriptionStatus.Pending,
      medications: 'Drug E, 200mg',
      notes: '',
    },
    '4': {
      id: '4',
      patientId: '1',
      status: PrescriptionStatus.Pending,
      medications: 'Drug D, 300mg',
      notes: 'Must use daily until the condition clears up.'
    },
  },
};

app.get("/", (_, res: Response) => {
  res.json({
    message: "hello world!",
  });
});

app.get("/patients", (_, res: Response) => {
  res.json(Object.values(database.patients));
});

app.get("/patients/:id", (req: Request, res: Response) => {
  const value = database.patients[req.params.id];
  if (value) {
    res.json(value);
  } else {
    res.sendStatus(404);
  }
});

app.post("/patients", (req: Request, res: Response) => {
  const { firstName, lastName, medications, notes } = req.body || {};

  if (!firstName || !lastName || !medications) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const patientId = uuidv4();
    const prescriptionId = uuidv4();

    database.patients[patientId] = {
      id: patientId,
      firstName,
      lastName,
    };
    database.prescriptions[prescriptionId] = {
      id: prescriptionId,
      patientId,
      status: PrescriptionStatus.Pending,
      medications,
      notes: notes || '',
    };

    res.json(database.patients[patientId]);
  }
});

app.get("/prescriptions", (_, res: Response) => {
  res.json(queryPrescriptionsData());
});

app.patch("/prescriptions/status/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body || {};

  if (database.prescriptions[id]) {
   if (Object.values(PrescriptionStatus).includes(status)) {
      database.prescriptions[id] = {
        ...database.prescriptions[id],
        status,
      }

      res.json(queryPrescriptionsData());
   } else {
    res.status(400).send("Error: Invalid status type");
   }
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


function queryPrescriptionsData() {
  const prescriptions = Object.values(database.prescriptions);
  const results: Array<PrescriptionData> = [];

  for (let i = 0; i < prescriptions.length; i++) {
    const patient = database.patients[prescriptions[i].patientId];
    results.push({
      ...prescriptions[i],
      patientInfo: {
        firstName: patient.firstName,
        lastName: patient.lastName,
      }
    });
  }

  return results;
};