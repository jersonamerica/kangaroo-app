import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KangarooForm from "./kangarooForm/KangarooForm";
import { DEFAULT_STATE } from "helpers";
import { Kangaroo } from "types";
import { kangaroos } from "data";

const EditKangaroo = () => {
  const { id } = useParams<{ id: string }>();
  const [kangarooData, setKangarooData] = useState<Kangaroo>(DEFAULT_STATE);

  useEffect(() => {
    // Fetch kangaroos here

    const selected = kangaroos.find((kangaroo) => kangaroo.id === id);
    // @ts-ignore
    setKangarooData(selected);
  }, [id]);

  return <KangarooForm isEditMode selected={kangarooData} />;
};

export default EditKangaroo;
