import Header from "../layouts/Header";

// PlaceholderPage Component - Generic placeholder for unimplemented pages
const PlaceholderPage = ({ title, icon = "fa-cog" }) => {
  return (
    <div>
      {/* Header */}
      <Header title={title} />

      {/* Placeholder Content */}
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className={`fas ${icon} text-3xl text-gray-400`} />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title} Page
        </h2>

        <p className="text-gray-500 max-w-md mx-auto">
          The {title.toLowerCase()} feature is coming soon.
          <br />
          This page will contain all the {title.toLowerCase()} management tools
          you need.
        </p>

        <button className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
