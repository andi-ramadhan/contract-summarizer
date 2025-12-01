import SubmitButton from "../SubmitButton";

export default function PasteTextCard({ classStyle }) {
  return (
    <div className={`shadow-lg shadow-gray-400 rounded-xl p-6 bg-white flex flex-col justify-between ${classStyle = ''}}`}>
      <h2 className="text-2xl font-medium mb-3">Paste Contract Text</h2>

      <textarea
        className="border rounded-lg p-3 w-full field-sizing-content"
        placeholder="Paste your contract here..."
      />
      
      <SubmitButton text={"Summarize"} />
    </div>
  )
}