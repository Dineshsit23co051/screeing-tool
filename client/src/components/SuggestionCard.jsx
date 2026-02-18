const SuggestionCard = ({ title, items = [] }) => (
  <div className="card">
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, index) => (
        <li key={`${title}-${index}`}>{item}</li>
      ))}
    </ul>
  </div>
);

export default SuggestionCard;
