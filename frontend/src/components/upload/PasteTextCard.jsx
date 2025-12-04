import { useState } from "react";

export default function PasteTextCard() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("https://contract-summarizer.ramadhanfajar-ara.workers.dev/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.summary);
    setLoading(false);
  };

  return (
    <div className={`shadow-lg shadow-gray-400 rounded-xl p-6 bg-white flex flex-col justify-between`}>
      <h2 className="text-2xl font-medium mb-3">Paste Contract Text</h2>

      <textarea
        className="border rounded-lg p-3 w-full field-sizing-content"
        placeholder="Paste your contract here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button 
        className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 hover:cursor-pointer"
        onClick={handleSummarize}  
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
          <strong>Summary:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}