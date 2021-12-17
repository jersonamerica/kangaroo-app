import { useState, ChangeEvent, FC, useEffect } from "react";

import Textbox from "components/textbox/Textbox";
import Dropdown from "components/dropdown/Dropdown";
import Container from "components/container/Container";
import Button from "components/button/Button";
import DatePicker from "react-datepicker";
import { DEFAULT_STATE } from "helpers";

import { kangaroos } from "data";
import { Kangaroo } from "types";

import "./style.scss";
import { Link } from "react-router-dom";

type Props = {
  isEditMode?: boolean;
  selected?: Kangaroo;
};

const KangarooForm: FC<Props> = ({ isEditMode, selected }) => {
  const [data, setData] = useState<Kangaroo>(selected || DEFAULT_STATE);
  const [error, setError] = useState<Partial<Kangaroo>>(DEFAULT_STATE);

  useEffect(() => {
    if (isEditMode && selected) {
      setData(selected);
    }
  }, [isEditMode, selected]);

  const submitForm = () => {
    const requiredField = ["birthday", "gender", "height", "weight", "name"];
    setError(DEFAULT_STATE);
    console.log("error", error);
    requiredField.forEach((field) => {
      // @ts-ignore
      if (!data[field]) {
        setError({
          [field]: `${field} must not be empty`,
        });
        return;
      }

      if (!/^\d+(\.\d{1,2})?$/.test(data.height)) {
        setError({
          ...error,
          height: "height must be a number",
        });
        return;
      }

      if (!/^\d+(\.\d{1,2})?$/.test(data.weight)) {
        setError({
          ...error,
          weight: "weight must be a number",
        });
        return;
      }

      const isNameAlreadyTaken = kangaroos.some(
        (kangaroo) => data.name === kangaroo.name
      );

      if (isNameAlreadyTaken && !isEditMode) {
        setError({
          name: `${data.name} is already taken`,
        });
      }

      // submit data
      submit(data);
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) =>
    setData({
      ...data,
      [key]: e.target.value,
    });

  const validateNumber = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (!/^\d+\.\d{0,2}$/.test(e.target.value)) {
      // not sure why this isn't working
      e.preventDefault();
    }

    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const submit = (data: Kangaroo) => {
    console.log("data", data);
  };
  return (
    <Container>
      <div className="form">
        <h2>{isEditMode ? "Edit" : "Add"} Kangaroo</h2>
        <Textbox
          label="Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "name")
          }
          errorMessage={error.name}
          value={data.name}
        />
        <Textbox
          label="Nickname"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "nickname")
          }
          value={data.nickname}
        />
        <Textbox
          label="Weight"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            validateNumber(e, "weight")
          }
          value={data.weight}
          errorMessage={error?.weight?.toString()}
        />
        <Textbox
          label="Height"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            validateNumber(e, "height")
          }
          value={data.height}
          errorMessage={error?.height?.toString()}
        />
        <Dropdown
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "gender")
          }
          label="Gender"
          options={[
            {
              label: "Male",
              value: "Male",
            },
            {
              label: "Female",
              value: "Female",
            },
          ]}
          value={data.gender}
          errorMessage={error.gender}
        />
        <Textbox
          label="Color"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "color")
          }
        />
        <Dropdown
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, "gender")
          }
          label="Friendliness"
          options={[
            {
              label: "Friendly",
              value: "Friendly",
            },
            {
              label: "Not Friendly",
              value: "Not Friendly",
            },
          ]}
          value={data.friendliness}
        />
        <label className="label">Birthday</label>
        <DatePicker
          selected={data.birthday}
          onChange={(date) =>
            setData({
              ...data,
              birthday: date as Date,
            })
          }
          className="datepicker"
          withPortal
        />

        <div className="button-container">
          <Link className="cancel-btn" to="/">
            <Button>Cancel</Button>
          </Link>

          <Button onClick={submitForm}>Submit</Button>
        </div>
      </div>
    </Container>
  );
};

export default KangarooForm;
