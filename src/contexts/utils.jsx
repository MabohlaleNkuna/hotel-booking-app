// utils.js
export function formatData(documents) {
    return documents.map((doc) => {
      const data = doc.data();
      let images = data.images.map((image) => image.url);
      let room = { ...data, images, id: doc.id };
      return room;
    });
  }
  