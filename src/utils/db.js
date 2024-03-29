import Dexie from "dexie";

const db = new Dexie("nexa-canvas");

db.version(3).stores({
  photos:
    "id, user, views, userImageBlob, user_id, largeImageBlob, tags, downloads",
  videos:
    "id, user, views, userImageBlob, user_id, thumbImageBlob, tags, downloads, videoBlob",
});

export default db;
export const { photos, videos } = db;
