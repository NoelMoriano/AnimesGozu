import firebase from "firebase";

export const querySnapshotToArray = (querySnapshot) => {
  const documents = [];

  querySnapshot.forEach((childSnapshot) =>
    documents.push({ ...childSnapshot.data(), id: childSnapshot.id })
  );

  return documents;
};

export const fetchCollectionOnce = async (query) => {
  const querySnapshot = await query.get();

  return querySnapshotToArray(querySnapshot);
};

export const fetchDocumentOnce = async (query) => {
  const documentSnapshot = await query.get();

  return documentSnapshot.data();
};

export const firestoreDeleteFields = (document) => {
  Object.entries(document).forEach(([key, value]) => {
    if (typeof value === "undefined")
      document[key] = firebase.firestore.FieldValue.delete();
  });

  return document;
};

export const now = () => firebase.firestore.Timestamp.now();

export const toTimestamp = ({ seconds, nanoseconds }) =>
  new firebase.firestore.Timestamp(seconds, nanoseconds);
