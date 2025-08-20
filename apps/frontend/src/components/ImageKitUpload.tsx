import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useEffect, useState } from "react";

// UploadExample component demonstrates file uploading using ImageKit's React SDK.
const UploadExample = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File>();

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("http://localhost:3001/auth");
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  }

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  const handleUpload = async () => {
    // Access the file input element using the ref
    // const fileInput = fileInputRef.current;
    // if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    //   alert("Please select a file to upload");
    //   return;
    // }

    // Extract the first file from the file input
    // const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
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

  return (
    <>
      {/* File input element using React ref */}
      <input type="file" onChange={handleChange} />
      {/* Button to trigger the upload process */}
      <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />
      {/* Display the current upload progress */}
      Upload progress: <progress value={progress} max={100}></progress>
      {selectedFile && <img src={preview} width={100} />}
    </>
  );
};

export default UploadExample;
