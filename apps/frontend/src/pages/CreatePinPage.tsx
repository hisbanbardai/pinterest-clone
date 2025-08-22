import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPinSchema, type createPinSchemaType } from "@repo/zod/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";

export default function CreatePinPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  // State to keep track of the current image upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [isUploadImagePressed, setIsUploadImagePressed] = useState(false);
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(createPinSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      setProgress(0);
      setIsUploadImagePressed(false);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile((prev) => prev || null);
      return;
    }

    //check if it is an image file
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const fileName = e.target.files[0].name;
    const lastDotIndex = fileName.lastIndexOf(".") + 1;
    const fileExtension = fileName.slice(lastDotIndex);

    const isAllowed = allowedExtensions.some((ext) => ext === fileExtension);

    if (!isAllowed) {
      toast.error("Only jpg, jpeg and png files are allowed");
      setSelectedFile(null);
      return;
    }

    //select the first file
    setSelectedFile(e.target.files[0]);

    //remove value onChange does not trigger if the same file is selected consecutively
    e.target.value = "";
  }

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/imagekitauth`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    // const fileInput = fileInputRef.current;
    // if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    //   alert("Please select a file to upload");
    //   return;
    // }

    // Extract the first file from the file input
    // const file = fileInput.files[0];

    setIsUploadImagePressed(true);

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      toast.error("Failed to authenticate for upload");
      setIsUploadImagePressed(false);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      if (selectedFile) {
        const uploadResponse = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file: selectedFile,
          folder: "/test",
          fileName: selectedFile.name, // Optionally set a custom file name
          // Progress callback to update upload progress state
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
          // Abort signal to allow cancellation of the upload if needed.
          abortSignal: abortController.signal,
        });
        console.log("Upload response:", uploadResponse);
        if (uploadResponse.url) {
          setValue("imageURL", uploadResponse.url);
        }
      }
    } catch (error) {
      toast.error("Upload error");
      setIsUploadImagePressed(false);
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  function handleRemoveImage() {
    setSelectedFile(null);
  }

  async function handleFormSubmit(formData: createPinSchemaType) {
    try {
      const { status, data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/pins`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (status === 201) {
        navigate(`/pin/${data.id}`);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Unable to create the pin");
      } else if (error instanceof Error) {
        toast.error("Unable to create the pin");
      }
    }
  }

  return (
    <main className="min-h-screen overflow-y-auto mb-10">
      <div className="flex justify-between items-center border-b border-black/10 py-3 w-full px-4 border-t">
        <span className="font-semibold text-xl">Create Pin</span>
      </div>

      <div className="flex flex-col max-w-[500px] mx-5 sm:mx-auto lg:flex-row lg:justify-center lg:max-w-[1000px]  gap-10 pt-7 relative mt-5">
        {selectedFile ? (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 left-90 cursor-pointer"
          >
            &#x274c;
          </button>
        ) : null}
        <div className="flex-1/3 flex flex-col gap-6">
          <label htmlFor="file">
            {selectedFile ? (
              <div className="cursor-pointer">
                <img src={preview} width={375} />
              </div>
            ) : (
              <div className="bg-neutral-200 h-[500px] rounded-2xl border-neutral-300 border-1 flex flex-col justify-between py-5 cursor-pointer">
                <div className="flex flex-col justify-center items-center flex-1 gap-3">
                  <img
                    src="/general/upload.svg"
                    alt="upload-icon"
                    className="w-[25px] object-cover"
                  />
                  <p className="text-black/70">Choose a file</p>
                </div>
                <div className="text-sm text-center text-neutral-500 px-4">
                  We recommend using high quality .jpg files less than 20MB.
                </div>
              </div>
            )}
          </label>
          <p className="border-b border-neutral-300"></p>
          {!isUploadImagePressed ? (
            <button
              onClick={handleUpload}
              disabled={selectedFile ? false : true}
              className="bg-red-500 text-white  rounded-full py-1 cursor-pointer disabled:bg-red-300"
            >
              Upload Image
            </button>
          ) : progress !== 100 ? (
            <>
              <p>Upload Progress:</p>
              <progress
                className="w-full"
                value={progress}
                max={100}
              ></progress>
            </>
          ) : (
            <p className="text-lg text-green-700 font-semibold">
              Image uploaded successfully!
            </p>
          )}
        </div>

        <div className="flex-1/2 ">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleChange}
              hidden
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="title">
                Title
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px]"
                type="text"
                {...register("title")}
                id="title"
                name="title"
                placeholder="Add a title"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="description">
                Description
              </label>
              <textarea
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px] resize-none"
                id="description"
                {...register("description")}
                name="description"
                placeholder="Add a detailed description"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="link">
                Image URL
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px] disabled:bg-black/8 cursor-not-allowed"
                type="text"
                id="imageURL"
                {...register("imageURL")}
                name="imageURL"
                placeholder="Image url"
              />
              <span className="text-xs ml-3 text-black/70">
                * Link will be generated automatically after the image is
                uploaded successfully
              </span>
              {errors.imageURL && (
                <p className="text-red-500">{errors.imageURL.message}</p>
              )}
            </div>
            <div className="mt-5  w-1/2 mx-auto">
              <button
                disabled={isSubmitting}
                className="text-white bg-red-600 py-3 px-4 rounded-full cursor-pointer w-full disabled:bg-red-300"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
