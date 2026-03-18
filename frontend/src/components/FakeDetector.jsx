function FakeDetector({ fakeReviews }) {
  if (!fakeReviews || fakeReviews === "0") {
    return (
      <div className="bg-green-900/20 border 
        border-green-800 rounded-2xl p-6">
        <h3 className="text-green-400 font-semibold 
          mb-2">
          ✅ Fake Review Detection
        </h3>
        <p className="text-gray-300 text-sm">
          No suspicious reviews detected. 
          All reviews appear genuine.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-900/20 border 
      border-yellow-800 rounded-2xl p-6">
      <h3 className="text-yellow-400 font-semibold 
        mb-2">
        ⚠️ Fake Review Detection
      </h3>
      <p className="text-gray-300 text-sm">
        {fakeReviews}
      </p>
    </div>
  );
}

export default FakeDetector;