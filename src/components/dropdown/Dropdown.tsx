import { FC, ChangeEventHandler } from "react";
import "./style.scss";

type Props = {
  label: string;
  options: Array<{ label: string; value: string }>;
  onChange: ChangeEventHandler;
  errorMessage?: string;
  value?: string;
};

const Dropdown: FC<Props> = ({
  label,
  options,
  onChange,
  errorMessage,
  value,
}) => {
  return (
    <div className={errorMessage ? "error" : ""}>
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <select className="dropdown" id={label} onChange={onChange}>
        <option value=""></option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="error-message">{errorMessage && errorMessage}</div>
    </div>
  );
};

export default Dropdown;
