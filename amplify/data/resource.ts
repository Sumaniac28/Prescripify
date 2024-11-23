import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Doctor: a.model({
      name: a.string().required(),
      email: a.string().required(),
      specialization: a.string().required(),
      clinicName: a.string().required(),
      profilePic: a.string(),
      signaturePic: a.string(),
      patients: a.hasMany("DoctorPatient", "doctorId"), 
      prescriptions: a.hasMany("Prescription", "doctorId"),
    }),

    Patient: a.model({
      name: a.string().required(),
      age: a.string().required(),
      email: a.string().required(),
      doctors: a.hasMany("DoctorPatient", "patientId"), 
      prescriptions: a.hasMany("Prescription", "patientId"),
    }),

    DoctorPatient: a.model({ 
      doctorId: a.id().required(),
      patientId: a.id().required(),
      doctor: a.belongsTo("Doctor", "doctorId"),
      patient: a.belongsTo("Patient", "patientId"),
    }),

    Prescription: a.model({
      patientId: a.id().required(),
      doctorId: a.id().required(),
      date: a.timestamp().required(),
      path: a.string().required(),
      illness: a.string().required(),
      medicine: a.string().required(),
      patient: a.belongsTo("Patient", "patientId"),
      doctor: a.belongsTo("Doctor", "doctorId"),
    }),

    Visit : a.model({
      patientId: a.id().required(),
      doctorId: a.id().required(),
      presciptionId: a.id().required(),
      date: a.timestamp().required(),
      illness: a.string().required(),
      prescription: a.string().required(),
    }),
  })
  .authorization((allow) => [allow.publicApiKey()]);


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey", // Use userPool for default authentication
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
