import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreatePinPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  // State to keep track of the current image upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [isUploadImagePressed, setIsUploadImagePressed] = useState(false);

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
    //select the first file
    setSelectedFile(e.target.files[0]);
  }

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("http://localhost:3001/imagekitauth", {
        credentials: "include",
      });
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

  return (
    <main className="min-h-screen overflow-y-auto mb-10">
      <div className="flex justify-between items-center border-b border-black/10 py-3 w-full px-4 border-t">
        <span className="font-semibold text-xl">Create Pin</span>
        <div className="flex gap-5 items-center">
          <span className="text-black/35 font-medium">Changes stored!</span>
          <button className="text-white bg-red-600 py-3 px-4 rounded-full cursor-pointer">
            Publish
          </button>
        </div>
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
          <form className="flex flex-col gap-4">
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
                id="title"
                name="title"
                placeholder="Add a title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="description">
                Description
              </label>
              <textarea
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px] resize-none"
                id="description"
                name="description"
                placeholder="Add a detailed description"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="link">
                Link
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px]"
                type="text"
                id="link"
                name="link"
                placeholder="Add a link"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="board">
                Board
              </label>
              <select
                name="board"
                id="board"
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px] text-black/45"
              >
                <option value="">Choose a board</option>
                <option value="1">Board 1</option>
                <option value="2">Board 2</option>
                <option value="3">Board 3</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black/75" htmlFor="tags">
                Tagged topics
              </label>
              <input
                className="border-2 border-black/10 py-2 px-3 rounded-2xl text-[15px]"
                type="text"
                name="tags"
                id="tags"
                placeholder="Search for a tag"
              />
              <small className="text-black/50">
                Don't worry people won't see your tags
              </small>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
