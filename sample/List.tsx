import { observer } from "mobx-react-lite";
import React from "react";
import UIBody from "../ui/UIBody";
import UIContainer from "../ui/UIContainer";
import UIHeader from "../ui/UIHeader";
import UIList from "../ui/UIList";
import UIRow from "../ui/UIRow";
import UIText from "../ui/UIText";

export default observer(({ showSidebar, sidebar }: any) => {
  return (
    <UIContainer>
      <UIHeader
        showSidebar={showSidebar}
        sidebar={sidebar}
        center={
          <UIRow
            style={{ alignItems: "center", marginLeft: 0, marginRight: 0 }}
          >
            <UIText size="large">List</UIText>
          </UIRow>
        }
      />
      <UIBody>
        <UIList
          primaryKey="nama"
          items={[
            { 
              nama: "Rizky",
              job: "Programmer"
            },
            {
              nama: "Joni",
              job: "Bos"
            }
          ]}
        />
      </UIBody>
    </UIContainer>
  );
});
