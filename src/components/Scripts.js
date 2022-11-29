// import React, { useState } from "react";
// import { firestore, querySnapshotToArray, toTimestamp } from "../firebase";
// import { Button } from "./ui";
// import { users } from "../data-list";
//
// export const Scripts = () => {
//   const [loading, setLoading] = useState(false);
//
//   const fetchUsers = async () => {
//     const usersQuery = await firestore.collection("users").get();
//
//     const users_ = querySnapshotToArray(usersQuery);
//
//     return users_;
//   };
//
//   // *********SCRIPT UPDATE USERS DATA************
//
//   const mapUser = (user) => ({
//     ...user,
//     roleCode: "user",
//     isDeleted: false,
//     createAt: toTimestamp({ ...user.createAt }),
//     updateAt: toTimestamp({ ...user.updateAt }),
//   });
//
//   const runScriptSetDataToFirestoreUsers = async () => {
//     try {
//       setLoading(true);
//       //
//       // const users = await fetchUsers();
//
//       const users_ = users.map((user) => mapUser(user));
//
//       console.log("users_->", users_);
//
//       users_.map(async (user) => {
//         await firestore
//           .collection("users")
//           .doc(user.id)
//           .set(user, { merge: true });
//       });
//
//       console.log("COMPLETE USERS SCRIPT!");
//     } catch (e) {
//       console.log("setDataToFirestore: ", e);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div>
//       <Button
//         loading={loading}
//         onClick={() => runScriptSetDataToFirestoreUsers()}
//       >
//         Run script
//       </Button>
//     </div>
//   );
// };
