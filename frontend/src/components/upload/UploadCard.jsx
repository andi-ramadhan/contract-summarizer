import { useState } from "react";

export default function UploadCard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    // send filename as dummy
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({
        text: `User uploaded the file: ${file.name}. (Real extraction coming later)`,
      }),
    });

    const data = await res.json();
    setResult(data.summary);
  };

  return (
    <div className={`shadow-lg shadow-gray-400 rounded-xl p-6 bg-white flex flex-col justify-between`}>
      <div className="flex flex-col">
        <h2 className="text-2xl font-medium mb-3">Upload Contract File</h2>
        <p className="text-sm text-gray-600 mb-4">Supports PDF, DOC, & DOCX</p>
      </div>

      <input
        type="file"
        className="border p-3 rounded-lg w-full"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button 
        className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 hover:cursor-pointer"
        onClick={handleUpload} 
      >
        Upload
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
          <strong>Summary:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}