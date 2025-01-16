const Card = ({ title, value, bgColor, textColor }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-4 flex flex-col items-center justify-center border border-gray-300`}
      style={{ backgroundColor: bgColor || "#FFFFFF", color: textColor || "#000000" }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
