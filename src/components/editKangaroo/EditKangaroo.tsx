import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KangarooForm from "../kangarooForm/KangarooForm";
import { DEFAULT_STATE } from "helpers";
import { Kangaroo } from "types";
import { kangaroos } from "data";

import "./style.scss";

const EditKangaroo = () => {
  const { id } = useParams<{ id: string }>();
  const [kangarooData, setKangarooData] = useState<Kangaroo>(DEFAULT_STATE);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch specific kangaroo here

    const selected = kangaroos.find((kangaroo) => kangaroo.id === id);
    if (selected) {
      setKangarooData(selected!);
    } else {
      setError("The kangaroo you are trying to edit does not exists");
    }
  }, [id]);

  if (error) return <div className="not-found">{error}</div>;

  return <KangarooForm isEditMode selected={kangarooData} />;
};

export default EditKangaroo;
