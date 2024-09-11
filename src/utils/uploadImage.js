// utils/uploadImage.js
import { storage } from '../firebase';


export const uploadImage = async (file, folderPath) => {
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`${folderPath}/${file.name}`);
  await imageRef.put(file);
  return await imageRef.getDownloadURL();
};
