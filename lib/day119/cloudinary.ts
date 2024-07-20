import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import type {
  UploadApiOptions,
  UploadApiResponse
} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const cld = new Cloudinary({
  cloud: {
    cloudName
  },
  url: {
    secure: true
  }
});

export const uploadImage = async (uploadOptions: {
  image: string;
  preset: string;
  tag?: string;
}) => {
  const { image, preset, tag } = uploadOptions;
  const options: UploadApiOptions = {
    upload_preset: preset,
    // allowed_formats: Array.from(["png", "jpg", "jpeg", "gif"]),
    tag: tag ?? "sample",
    unsigned: true
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    await upload(cld, {
      file: image,
      options: options,
      callback: (error: any, response: any) => {
        if (error || !response) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    });
  });
};
