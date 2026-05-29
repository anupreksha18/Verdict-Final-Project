function FakeDetector({ fakeReviews }) {
  if (!fakeReviews || fakeReviews === "0") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h3 className="text-green-700 font-semibold mb-2">
          Fake Review Detection
        </h3>
        <p className="text-gray-600 text-sm">
          No suspicious reviews detected. Everything looks genuine.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
      <h3 className="text-yellow-700 font-semibold mb-2">
        Fake Review Detection
      </h3>
      <p className="text-gray-600 text-sm">
        {fakeReviews}
      </p>
    </div>
  );
}

export default FakeDetector;