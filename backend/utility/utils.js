const getImage = async (req) => {
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
  return `${basePath}${fileName}`;
};

const getGalleryImages = async (req) => {
  const files = req.files;
  let images = [];

  const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;

  if (files && files.length > 0) {
    images = files.map((file) => {
      return `${basePath}${file.filename}`;
    });
  }

  return images;
};

export { getImage, getGalleryImages };
