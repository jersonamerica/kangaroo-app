import { useState, ChangeEvent, FC, useEffect } from "react";

import Textbox from "components/textbox/Textbox";
import Dropdown from "components/dropdown/Dropdown";
import Container from "components/container/Container";
import Button from "components/button/Button";
import DatePicker from "react-datepicker";
import { DEFAULT_STATE, isValidNumber, capitalize } from "helpers";

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
    const requiredFields = ["birthday", "gender", "height", "weight", "name"];
    let formError: Partial<Kangaroo> = {};
    setError(DEFAULT_STATE);

    requiredFields.forEach((field) => {
      // @ts-ignore
      if (!data[field]) {
        // @ts-ignore
        formError[field] = `${capitalize(field)} must not be empty`;
      }
    });

    const isNameAlreadyTaken = kangaroos
      .filter((kangaroo) => kangaroo.name !== selected?.name)
      .some((kangaroo) => kangaroo.name === data.name);
    if (isNameAlreadyTaken) {
      formError.name = `${data.name} is already taken`;
    }

    if (data.height && !isValidNumber(data.height)) {
      formError.height = "Height must be a valid number";
    }

    if (data.weight && !isValidNumber(data.weight)) {
      formError.weight = "Weight must be a valid number";
    }

    if (Object.keys(formError).length) {
      setError(formError);
      return;
    }
    // submit data
    submit(data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) =>
    setData({
      ...data,
      [key]: e.target.value,
    });

  const validateNumber = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (!isValidNumber(e.target.value)) {
      // not sure why this isn't working
      e.preventDefault();
    }

    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const submit = (data: Kangaroo) => {
    console.log(data);
  };
  return (
    <Container>
      <div className="form">
        <h1>{isEditMode ? "Edit" : "Add"} Kangaroo</h1>
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
          errorMessage={error?.weight}
        />
        <Textbox
          label="Height"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            validateNumber(e, "height")
          }
          value={data.height}
          errorMessage={error?.height}
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
