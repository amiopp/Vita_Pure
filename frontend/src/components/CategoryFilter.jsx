export default function CategoryFilter({ categories, activeCategory, onChange }) {
  const allCategories = ["Tous", ...categories];

  return (
    <div className="flex flex-wrap gap-3">
      {allCategories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 ${
              isActive
                ? "border-pure-green bg-pure-green text-white shadow-card"
                : "border-pure-line bg-white text-pure-ink hover:border-pure-green hover:text-pure-green"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

