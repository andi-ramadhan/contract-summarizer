export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-gray-600">
       © ContractSummarizer {new Date().getFullYear()}
    </footer>
  );
}