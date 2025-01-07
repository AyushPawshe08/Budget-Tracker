import React, { useRef, useState, useEffect } from "react";
import { Camera, CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pic: "", // For Cloudinary URL
  });
  const [isImageLoading, setIsImageLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);

  // Retrieve user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user
    }
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImageLoading(true); // Start image upload
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "BudgetTracker"); // Replace with your Cloudinary preset
    data.append("cloud_name", "djzsehi5y"); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djzsehi5y/image/upload",
        {
          method: "POST", // Use POST for Cloudinary uploads
          body: data,
        }
      );
      const uploadedImage = await res.json();
      if (uploadedImage.url) {
        setFormData((prevState) => ({
          ...prevState,
          pic: uploadedImage.url,
        }));
        setUser((prevUser) => ({
          ...prevUser,
          pic: uploadedImage.url,
        }));

        // Optionally, update localStorage with the new profile picture
        const updatedUser = { ...user, pic: uploadedImage.url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      setIsImageLoading(false);
    } catch (err) {
      console.error("Error uploading image:", err);
      setIsImageLoading(false); // Stop loading state even on error
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically open the file dialog
  };

  return (
    <div className="h-screen pt-20 bg-gray-50">
      {/* Back Button */}
      <Link to="/dashboard" className="m-5 flex items-center text-blue-500">
        <CircleArrowLeft size={34} />
        Back
      </Link>

      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white shadow-md rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            <p className="mt-2 text-gray-500">Update your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Avatar */}
              <img
                src={user?.pic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />

              {/* Camera Icon */}
              <button
                type="button"
                onClick={handleUploadClick}
                className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {isImageLoading && (
              <p className="text-sm text-blue-500 mt-2">Uploading image...</p>
            )}
            <p className="text-sm text-gray-500">
              Click the icon to upload a new profile picture.
            </p>
          </div>

          {/* User Information */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">
              {user?.username || "John Doe"}
            </p>
            <p className="text-sm text-gray-500">{user?.email || "johndoe@example.com"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
