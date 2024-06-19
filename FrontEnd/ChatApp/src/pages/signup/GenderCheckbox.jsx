const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="text-white label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-white"
            checked={selectedGender === "male"}
            onChange={(e) => {
              onCheckboxChange("male");
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="text-white label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-white"
            checked={selectedGender === "female"}
            onChange={(e) => {
              onCheckboxChange("female");
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
