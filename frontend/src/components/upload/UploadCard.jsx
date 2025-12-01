import SubmitButton from "../SubmitButton";

export default function UploadCard({ classStyle }) {
  return (
    <div className={`shadow-lg shadow-gray-400 rounded-xl p-6 bg-white flex flex-col justify-between ${classStyle = ''}`}>
      <div className="flex flex-col">
        <h2 className="text-2xl font-medium mb-3">Upload Contract File</h2>
        <p className="text-sm text-gray-600 mb-4">Supports PDF, DOC, & DOCX</p>
      </div>

      <input
        type="file"
        className="border p-3 rounded-lg w-full"
        accept=".pdf,.doc,.docx"
      />

      <SubmitButton text={"Upload"} />
    </div>
  );
}