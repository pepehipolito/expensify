const promise = new Promise((resolve, reject) => {
  // A promise runs some asynchronous code and then it calls 'resolve' or 'reject' based on success/failure.
  // resolve and reject can be called only once and they can contain only one argument, which can be anything.
  setTimeout(() => {
    // resolve({
    //   name: 'pepe',
    //   age: 52
    // });
    reject('Somthing went wrong');
  }, 3000);
});

console.log('before');

// 'then' gets executed when the promise is resolved.
// 'catch' gets executed when the promises is rejected.
promise.then((data) => {
  console.log(1, data);
}).catch((error) => {
  console.log(`error: ${error}`);
});

// Alternative 'catch' syntax (second callback to 'then'):
// promise.then((data) => {
//   console.log(1, data);
// }, (error) => {
//   console.log(`error: ${error}`);
// });

console.log('after');
