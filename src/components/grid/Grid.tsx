import { FC, useRef } from "react";
import { useHistory } from "react-router-dom";
import DataGrid, { Column, Editing } from "devextreme-react/data-grid";

import "./style.scss";

type Props = {
  data: any;
};

const Datagrid: FC<Props> = ({ data }) => {
  const dataGridRef = useRef(null);

  const history = useHistory();

  return (
    <div className="grid-wrapper">
      <DataGrid
        ref={dataGridRef}
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        keyExpr="id"
        onEditingStart={({ data }: any) => history.push(`/edit/${data.id}`)}
      >
        <Editing allowUpdating={true} />
        <Column
          dataField="name"
          caption="Name"
          dataType="string"
          alignment="left"
        />
        <Column
          dataField="birthdate"
          caption="Birthdate"
          dataType="date"
          alignment="left"
        />
        <Column
          dataField="weight"
          caption="Weight"
          dataType="number"
          alignment="left"
        />
        <Column
          dataField="height"
          caption="Height"
          dataType="number"
          alignment="left"
        />
        <Column
          dataField="friendliness"
          caption="Friendliness"
          dataType="string"
          alignment="left"
        />
        <div>test</div>
      </DataGrid>
    </div>
  );
};

export default Datagrid;
