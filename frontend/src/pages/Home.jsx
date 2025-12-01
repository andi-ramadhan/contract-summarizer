import PasteTextCard from "../components/upload/PasteTextCard";
import UploadCard from "../components/upload/UploadCard";

export default function Home() {
  return (
    <div className="bg-linear-to-br from-emerald-100 via-white to-emerald-200 z-50 w-full overflow-hidden flex flex-col gap-5 justify-center items-center min-h-screen">
      <div className="flex flex-col gap-3 pb-5">
        <h1 className="text-5xl font-bold">Summarize your contract</h1>
        <p className="mt-2 text-gray-600 text-center">Upload PDF, DOCX, or paste your text.</p>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-5">
        <UploadCard />
        <PasteTextCard />
      </div>
    </div>
  );
}