import { useRef } from "react";
import { Camera } from "lucide-react";

const AvatarUpload = ({ preview, onChange }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Zehmet olmasa sekil formatinda fayl secin");
      return;
    }

    const url = URL.createObjectURL(file);
    onChange(url, file);
  };

  return (
    <div className="avatar-upload">
      <div className="avatar-upload-circle" onClick={() => fileInputRef.current?.click()}>
        {preview ? (
          <img src={preview} alt="Profil sekli" />
        ) : (
          <Camera size={26} />
        )}
      </div>

      <button type="button" className="avatar-upload-btn" onClick={() => fileInputRef.current?.click()}>
        {preview ? "Sekli deyis" : "Sekil sec"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AvatarUpload;