import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export const initDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lgn REAL NOT NULL
    )`),
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        };
    });
  });

  return promise;
};

export const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lgn) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUrl,
          place.address,
          place.location.lat,
          place.location.lgn,
        ],
        (_, result) => {
          resolve(result.rows);
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          console.log(result.rows._array);
          const places = result.rows._array?.map((item) => {
            const { lat, lgn, ...data } = item;

            return {
              ...data,
              location: {
                lat,
                lgn,
              },
            };
          });
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const deletePlace = (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `DELETE FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
