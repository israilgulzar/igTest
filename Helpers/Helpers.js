// modules.export{
//     hasPass: ({ password, saltRounds }) => {
//         bcrypt.hash(password, saltRounds && !saltRounds === undefined ? saltRounds : 10, async (err, hash) => {
//             if (!err) {
//                 console.log({ hashDone: true, hashPassword: hash })
//                 return { hashDone: true, hashPassword: hash }
//             } else {
//                 return { hashDone: false, hashPassword: err }
//             }
//         });
//     }
// }