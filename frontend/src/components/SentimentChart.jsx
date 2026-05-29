import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function SentimentChart({ sentiment }) {
  const data = [
    { name: "Positive", value: sentiment.positive },
    { name: "Negative", value: sentiment.negative },
    { name: "Neutral", value: sentiment.neutral },
  ].filter((d) => d.value > 0);

  const COLORS = ["#22c55e", "#ef4444", "#eab308"];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

      <h3 className="font-semibold text-black mb-5">
        Sentiment Analysis
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8">

        {/* PIE CHART */}
        <div className="w-full md:w-1/2 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(v) => `${v}%`}
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: "#111"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <div className="w-full md:w-1/2 space-y-4">

          {/* Positive */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Positive</span>
              <span className="text-sm font-semibold text-green-600">
                {sentiment.positive}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${sentiment.positive}%` }}
              />
            </div>
          </div>

          {/* Negative */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Negative</span>
              <span className="text-sm font-semibold text-red-600">
                {sentiment.negative}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div
                className="h-2 bg-red-500 rounded-full"
                style={{ width: `${sentiment.negative}%` }}
              />
            </div>
          </div>

          {/* Neutral */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Neutral</span>
              <span className="text-sm font-semibold text-yellow-600">
                {sentiment.neutral}%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div
                className="h-2 bg-yellow-400 rounded-full"
                style={{ width: `${sentiment.neutral}%` }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SentimentChart;