import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export {firebase, database as default};

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log('child removed', snapshot.key, snapshot.val());
// });
//
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log('child changed', snapshot.key, snapshot.val());
// });
//
// // child_added fires once for every existing entry in the DB and then every time a new one is added.
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log('child added', snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('value', (snapshot) => {
//   console.log('>>>>> expenses on:', snapshot.val());
// });

// database.ref('expenses').once('value')
//   .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((expense) => {expenses.push({id: expense.key, ...expense.val()})});
//     console.log(expenses);
//   });

// const expenses = [
//   {
//     description: 'Expense One',
//     note: '',
//     amount: 1002,
//     createdAt: 1000
//   },
//   {
//     description: 'Expense Two',
//     note: '',
//     amount: 10000,
//     createdAt: 10000
//   },
//   {
//     description: 'Expense Three',
//     note: '',
//     amount: 20345,
//     createdAt: 100000
//   }
// ];
//
// const ref = database.ref('expenses');
//
// expenses.forEach((expense) => {
//   ref.push(expense);
// });

// firebase does not work with arrays, so in order to write a record we need a root (like 'notes' here)
// and call push() with an object. The response contains a 'key' value, wich is the unique ID generated
// by firebase for our object within the given root.
// database.ref('notes').push({
//   title: 'A different to do',
//   body: 'Go hunting for gamusinos'
// }).then((pushResponse) => {
//   // console.log('>>>>> resp key:', resp.key);
//   database.ref(`notes/${pushResponse.key}`).once('value')
//     .then((rcd) => {
//       console.log('..... my rcd:', rcd.val())
//     });
// });

// // ref() without an argument gets a reference to the root of the DB.
// // ref() with an argument gets a reference to a specific attribute of the DB.
// const personData = () => {
//   return database.ref().set({
//     name: 'pepe',
//     age: 52,
//     stressLevel: 7,
//     job: {
//       title: 'dev',
//       company: 'hackers.com'
//     },
//     isSingle: false,
//     location: {
//       city: 'Tampa',
//       country: 'USA'
//     },
//     nickname: 'pepito',
//   });
// };
//
// personData().then(() => {
//   // firebase does not return anything on success.
//   console.log('Success on person data');
// }).catch((error) => {
//   console.log('Error on person data:', error);
// });
//
// const getDataOnce = () => {
//   // This returns all the data in the DB. If wanted to be more specific we can pass the path to the
//   // attribute we want to 'ref()': ref('location/city'), or ref('location').
//   return database.ref().once('value');
// };
//
// getDataOnce().then((response) => {
//   console.log('Data read successfully:', response.val());
// }).catch((error) => {
//   console.log('Data could not be read:', error);
// });
//
// // Using on() is like a subscription and it does not return a promise because promises can only be
// // resolved or rejected once and what we wat is to monitor changes to the DB so the callback function
// // is what runs on an update.
// const getDataOnChange = () => {
//   return database.ref().on('value', (snapshot) => {
//     console.log('Data updated:', snapshot.val());
//   }, (error) => {
//     console.log('Error fetching data with "on":', error);
//   });
// };
//
// const onValueChange = getDataOnChange();
//
// // Subscription to print name, title, and company.
// //  <name> is a <title> at <company>.
// // Change data and make sure it reprints.
// database.ref().on('value', (snapshot) => {
//   const {name, job} = snapshot.val();
//   console.log(`${name} is a ${job.title} at ${job.company}`);
// })
//
// setTimeout(() => {
//   database.ref().update({
//     name: 'tzutai',
//     job: {
//       title: 'housewife',
//       company: 'home'
//     }
//   });
// }, 3000);
//
// setTimeout(() => {database.ref().off('value')}, 3000);
// // update() allows to change existing values, add new attributes, delete existing attributes, and it
// // ignores unknown attributes flagged for deletion (like foobar here).
// // Also, check the syntax for nested attributes (location/city).
// // const updateData = () => {
// //   return database.ref().update({
// //     stressLevel: 9,
// //     'job/company': 'Amazon',
// //     'location/city': 'Seattle',
// //     isSingle: null,
// //     foobar: null
// //   });
// // }
// //
// // updateData().then(() => {
// //   // firebase does not return anything on success.
// //   console.log('Data updated successfully:');
// // }).catch((error) => {
// //   console.log('Data was not updated:', error);
// // });
//
// // Removing isSingle.
// // const removeIsSingle = () => {
// //   return database.ref('isSingle').remove();
// //   // Alternative way with 'set':
// //   // return database.ref('isSingle').set(null);
// // };
// //
// // removeIsSingle().then((success) => {
// //   console.log('isSingle removed:', success);
// // }).catch((error) => {
// //   console.log('isSingle not removed:', error);
// // });
