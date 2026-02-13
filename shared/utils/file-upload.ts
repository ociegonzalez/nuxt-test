import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface IUploadResponse {
  success: boolean;
  result?: UploadApiResponse | undefined;
  error?: any;
}

export const fileUpload = async (fileBuffer: Buffer<ArrayBufferLike>) => {
  try {
    const uuidFileName = uuid();

    const uploadResult = await new Promise<IUploadResponse>(
      async (resolve, reject) => {
        const uploadResource = cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              public_id: uuidFileName,
              folder: "nuxt-test",
            },
            (error, result) => {
              if (error) {
                console.log(error);

                reject({ success: false, error });
              } else {
                resolve({ success: true, result });
              }
            },
          )
          .end(fileBuffer);
      },
    );

    console.log({ result: uploadResult.result });

    if (!uploadResult.success) {
      throw new Error("File could not be uploaded");
    }

    const optimizedUrl = cloudinary.url(uploadResult.result!.public_id, {
      fetch_format: "auto",
      quality: "auto",
      height: 600,
      width: 400,
      crop: 'limit'
    });

    return optimizedUrl;
  } catch (error) {
    console.log(error);
    throw new Error("File could not be uploaded");
  }
};
