import { assign } from "lodash";
import { now } from "../firebase";
import { useAuthentication } from "../providers/Authentication";

// interface DocumentCreate {
//   createAt: firebase.firestore.Timestamp;
//   updateAt: firebase.firestore.Timestamp;
//   updateBy: string;
//   isDeleted?: false;
// }
//
// interface DocumentUpdate {
//   updateAt: firebase.firestore.Timestamp;
//   updateBy: string;
// }
//
// interface DocumentDelete {
//   updateAt: firebase.firestore.Timestamp;
//   updateBy: string;
//   isDeleted?: true;
// }
//
// interface Return {
//   assignCreateProps: <U>(document: U) => U & DocumentCreate;
//   assignDeleteProps: <U>(document: U) => U & DocumentDelete;
//   assignUpdateProps: <U>(document: U) => U & DocumentUpdate;
// }

export const useDefaultFirestoreProps = (isSoftDelete = true) => {
  const { authUser } = useAuthentication();

  if (!authUser) return alert("Missing global user");

  const assignCreateProps = (document) => {
    const CREATE = {
      createAt: now(),
      updateAt: now(),
      updateBy: authUser.email,
    };

    if (isSoftDelete) CREATE.isDeleted = false;

    return assign({}, document, CREATE);
  };

  const assignUpdateProps = (document) => {
    const UPDATE = {
      updateAt: now(),
      updateBy: authUser.email,
    };

    return assign({}, document, UPDATE);
  };

  const assignDeleteProps = (document) => {
    const DELETE = {
      updateAt: now(),
      updateBy: authUser.email,
    };

    if (isSoftDelete) DELETE.isDeleted = true;

    return assign({}, document, DELETE);
  };

  return {
    assignCreateProps,
    assignUpdateProps,
    assignDeleteProps,
  };
};
