function ProsCons({ pros, cons }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 
      gap-6">

      {/* Pros */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-6">
        <h3 className="text-green-400 font-semibold 
          mb-4 flex items-center gap-2">
          ✅ Pros
        </h3>
        <ul className="space-y-3">
          {pros.map((pro, i) => (
            <li key={i} 
              className="flex items-start gap-3">
              <span className="text-green-500 
                mt-0.5 text-lg leading-none">
                •
              </span>
              <span className="text-gray-300 text-sm 
                leading-relaxed">
                {pro}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-6">
        <h3 className="text-red-400 font-semibold 
          mb-4 flex items-center gap-2">
          ❌ Cons
        </h3>
        <ul className="space-y-3">
          {cons.map((con, i) => (
            <li key={i} 
              className="flex items-start gap-3">
              <span className="text-red-500 
                mt-0.5 text-lg leading-none">
                •
              </span>
              <span className="text-gray-300 text-sm 
                leading-relaxed">
                {con}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default ProsCons;