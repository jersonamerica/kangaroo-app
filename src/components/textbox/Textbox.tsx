import { ChangeEventHandler, KeyboardEvent, FC } from "react";

import "./style.scss";

type Props = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  errorMessage?: string;
  value?: string | number;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
};
const Textbox: FC<Props> = ({
  label,
  onChange,
  errorMessage,
  value,
  onKeyPress,
}) => {
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
        onKeyPress={onKeyPress}
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
