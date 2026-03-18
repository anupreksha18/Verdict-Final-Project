function SummaryCard({ summary }) {
  return (
    <div className="bg-gray-900 border border-gray-800 
      rounded-2xl p-6">
      <h3 className="text-purple-400 font-semibold 
        mb-3 flex items-center gap-2">
        📋 Summary
      </h3>
      <p className="text-gray-300 text-sm 
        leading-relaxed">
        {summary}
      </p>
    </div>
  );
}

export default SummaryCard;