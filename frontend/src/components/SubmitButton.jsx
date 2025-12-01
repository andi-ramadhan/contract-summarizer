export default function SubmitButton({ text }) {
  return (
    <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 hover:cursor-pointer">
      {text}
    </button>
  );
}