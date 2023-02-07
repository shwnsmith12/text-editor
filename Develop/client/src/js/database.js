import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// GET function
export const getDb = async (value) => {
  console.log('Getting data from the jateDB');
  // Connecting to DB & Version
  const jateDb = await openDB('jate', 1);
  // Making a New Transaction Specifying Which DB to Post To 
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  // Getting All Content From Object Store Created Above
  const req = objStore.getAll()
  // Confirming the Data was Received
  const res = await req;
  console.log('data saved to the jateDB', res);
};

// PUT function
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  // Passing Content to the Object Store
  const req = objStore.put({ id: id, value: value })
  const res = await req;
  console.log('data saved to the jateDB', res);
};

initdb();