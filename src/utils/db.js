import Dexie from "dexie";

const db = new Dexie("nexa-canvas");

db.version(1).stores({
  photos:
    "id, user, views, userImageBlob, user_id, largeImageBlob, tags, downloads",
});

export default db;
export const { photos } = db;
