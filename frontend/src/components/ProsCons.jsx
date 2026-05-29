function ProsCons({ pros, cons }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* PROS */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-green-600 font-semibold mb-4">
          Pros
        </h3>

        <ul className="space-y-3">
          {pros.map((p, i) => (
            <li key={i} className="text-gray-700 text-sm flex gap-2">
              <span className="text-green-500">•</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* CONS */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-red-600 font-semibold mb-4">
          Cons
        </h3>

        <ul className="space-y-3">
          {cons.map((c, i) => (
            <li key={i} className="text-gray-700 text-sm flex gap-2">
              <span className="text-red-500">•</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default ProsCons;