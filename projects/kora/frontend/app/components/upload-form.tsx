import { useState } from 'react';
import { userApiService } from '../../services/api/userService';

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const { url, publicUrl } = await userApiService.getPresignedUrl();
      await userApiService.upload(file, url);
      setPhotoUrl(publicUrl);
console.log(`publicUrl is ${publicUrl}`)
    } catch (error) {
      console.log('Upload error:', error);
      alert('An error occurred while uploading');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 text-white px-4 py-2 mt-2">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="mt-2 w-40 h-40 object-cover" />
        </div>
      )}
    </div>
  );
}
