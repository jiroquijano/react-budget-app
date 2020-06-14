import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database as default};

// database.ref('expenses').push({
//     description: 'laptop',
//     note: 'to be delivered next week',
//     amount: 85000,
//     createdAt: 'last week'
// });

// database.ref('expenses').once('value').then((snapshot)=>{
//     const expenses = [];
//     snapshot.forEach(expense=>{
//         expenses.push({
//             id: expense.key,
//             ...expense.val()
//         });
//     })
//     console.log(expenses);
// });

// database.ref('expenses').on('value',(snapshot)=>{
//     const expenses = [];
//     snapshot.forEach(expense=>{
//         expenses.push({
//             id: expense.key,
//             ...expense.val()
//         })
//     });
//     console.log(expenses);
// });

// database.ref('expenses').on('child_removed', (snapshot)=>{
//     console.log(snapshot);
// });

// database.ref('expenses').on('child_changed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added',(snapshot)=>{
//     console.log(snapshot.key, snapshot.val());
// })


// database.ref().set({
//     name: 'jiro',
//     surname: 'quijano',
//     job: {
//         title: 'technical leader',
//         company: 'nokia'
//     },
//     parents: {
//         mother: 'Sarah Quijano',
//         father: 'Claudio Quijano Jr.'
//     }
// })

// const dataSubscription = database.ref()
//     .on('value', (snapshot)=>{
//         const {name, surname, job, parents} = snapshot.val();
//         console.log(`I am ${name} ${surname}, a ${job.title} at ${job.company}. my Parents are ${parents.mother} and ${parents.father}`)
//     });

// setTimeout(()=>{
//     database.ref().update({
//         name: 'Safiro',
//         job: {
//             title: 'web developer',
//             company: 'sa puso mo'
//         }
//     });
// },1000);



// database.ref('attributes').set({
//     height: 'tall',
//     weight: 'quite heavy'
// });

// database.ref('isSingle').remove();

// database.ref().update({
//     stressLevel : 9,
//     'job/company' : 'paymaya'
// });