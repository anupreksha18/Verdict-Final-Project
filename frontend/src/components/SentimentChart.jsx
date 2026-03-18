import {
  PieChart, Pie, Cell,
  Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

function SentimentChart({ sentiment }) {
  const data = [
    { 
      name: "Positive", 
      value: sentiment.positive 
    },
    { 
      name: "Negative", 
      value: sentiment.negative 
    },
    { 
      name: "Neutral",  
      value: sentiment.neutral  
    },
  ].filter(d => d.value > 0);

  const COLORS = ["#22c55e", "#ef4444", "#eab308"];

  return (
    <div className="bg-gray-900 border border-gray-800 
      rounded-2xl p-6">
      <h3 className="text-purple-400 font-semibold 
        mb-4">
        😊 Sentiment Analysis
      </h3>
      <div className="flex flex-col md:flex-row 
        items-center gap-6">

        {/* Pie Chart */}
        <div className="w-full md:w-1/2 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => `${v}%`}
                contentStyle={{
                  background: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#e5e7eb"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-4 w-full md:w-1/2">
          {[
            { 
              label: "Positive", 
              value: sentiment.positive, 
              color: "bg-green-500",
              text: "text-green-400"
            },
            { 
              label: "Negative", 
              value: sentiment.negative, 
              color: "bg-red-500",
              text: "text-red-400"
            },
            { 
              label: "Neutral",  
              value: sentiment.neutral,  
              color: "bg-yellow-500",
              text: "text-yellow-400"
            },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center 
                justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full 
                    ${item.color}`}>
                  </div>
                  <span className="text-gray-300 text-sm">
                    {item.label}
                  </span>
                </div>
                <span className={`font-bold text-sm 
                  ${item.text}`}>
                  {item.value}%
                </span>
              </div>
              <div className="w-full bg-gray-700 
                rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full 
                    ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SentimentChart;