function Team() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold 
          text-white mb-3">
          Our Team
        </h1>
        <p className="text-gray-500">
          The people behind ReviewMind
        </p>
      </div>

      {/* Student */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8 
        text-center mb-6">
        <div className="w-24 h-24 rounded-full 
          bg-purple-900/50 border-2 border-purple-600
          flex items-center justify-center 
          mx-auto mb-4 text-4xl">
          👨‍💻
        </div>
        <h2 className="text-white font-bold 
          text-2xl mb-1">
          Your Name Here
        </h2>
        <p className="text-purple-400 text-sm 
          font-medium mb-3">
          BCA Final Year Student
        </p>
        <p className="text-gray-500 text-sm mb-4">
          Your College Name Here
        </p>
        <div className="flex flex-wrap justify-center 
          gap-2">
          {[
            "Python",
            "React.js",
            "Machine Learning",
            "RAG",
            "Flask",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-800 
                text-gray-400 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Guide */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-8 
        text-center mb-6">
        <div className="w-24 h-24 rounded-full 
          bg-blue-900/50 border-2 border-blue-600
          flex items-center justify-center 
          mx-auto mb-4 text-4xl">
          👨‍🏫
        </div>
        <h2 className="text-white font-bold 
          text-2xl mb-1">
          Guide Name Here
        </h2>
        <p className="text-blue-400 text-sm 
          font-medium mb-3">
          Project Guide
        </p>
        <p className="text-gray-500 text-sm">
          Department of Computer Science
        </p>
        <p className="text-gray-500 text-sm">
          Your College Name Here
        </p>
      </div>

      {/* Project Details */}
      <div className="bg-gray-900 border 
        border-gray-800 rounded-2xl p-6">
        <h2 className="text-purple-400 font-bold 
          text-xl mb-4">
          📌 Project Details
        </h2>
        <div className="space-y-3">
          {[
            {
              label: "Project Title",
              value: "E-Commerce Product Rating System Based on Customer Review Mining Using RAG"
            },
            {
              label: "Academic Year",
              value: "2024-2025"
            },
            {
              label: "Course",
              value: "Bachelor of Computer Applications (BCA)"
            },
            {
              label: "Project Type",
              value: "Major Final Year Project"
            },
            {
              label: "Domain",
              value: "Artificial Intelligence + Natural Language Processing"
            },
          ].map((item) => (
            <div key={item.label}
              className="flex gap-4 py-3 border-b 
                border-gray-800 last:border-0">
              <span className="text-gray-500 text-sm 
                w-32 shrink-0">
                {item.label}
              </span>
              <span className="text-gray-300 text-sm">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Team;