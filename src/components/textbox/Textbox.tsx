import { ChangeEventHandler, FC } from "react";

import "./style.scss";

type Props = {
  label: string;
  onChange: ChangeEventHandler;
  className?: string;
  errorMessage?: string;
  value?: string | number;
};
const Textbox: FC<Props> = ({ label, onChange, errorMessage, value }) => {
  return (
    <div className={errorMessage ? "error" : ""}>
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <input
        type="text"
        id={label}
        onChange={onChange}
        className="textbox"
        defaultValue={value}
      />
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Textbox;
