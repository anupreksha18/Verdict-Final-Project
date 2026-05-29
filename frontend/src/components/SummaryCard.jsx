function SummaryCard({ summary }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-black mb-3">
        Summary
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {summary}
      </p>
    </div>
  );
}

export default SummaryCard;