const DropDown = ({ name, data, handleChange }) => {
  return (
    Array.isArray(data) &&
    data.length > 0 && (
      <select name={name} onChange={handleChange}>
        {data.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    )
  );
};

export default DropDown;
