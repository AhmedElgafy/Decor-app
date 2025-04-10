import { Readable } from "stream";
import cloudinary from "../config/cloudinary.config";
import { error } from "console";
import { URLSearchParams } from "url";
import { UploadApiResponse } from "cloudinary";

export async function uploadFile(
  file: Express.Multer.File | undefined
): Promise<string | null> {
  try {
    if (!file) throw new Error("No file provided");
    const uploadResult = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "Decor app" }, // optional
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        // Convert the buffer to a readable stream and pipe to Cloudinary
        Readable.from(file.buffer).pipe(uploadStream);
      }
    );
    console.log("Uploaded successfully");
    return uploadResult?.secure_url || null;
  } catch (err) {
    console.log("this is an error => ", err);
    throw Error("check your console cause of cloudinary error");
  }
}
export async function deleteFile(url: string) {
  const arr = decodeURI(url).split("/");
  const id = [arr.at(-2), "/", arr.at(-1)?.split(".")[0]].join("");
  console.log(id);
  try {
    const res = await cloudinary.uploader.destroy(id, function (result) {
      console.log(result);
    });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
