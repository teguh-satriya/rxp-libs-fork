import React, { useState } from "react";
import UIBody from "../ui/UIBody";
import UIContainer from "../ui/UIContainer";
import UIJsonField from "../ui/UIJsonField";

export default () => {
  const [items, setItems] = useState({
    id: 1,
    username: "Joni",
    password: "okejon",
    role: "Sales",
    whouse: "whs-001",
    total: 10000
  });

  return (
    <UIContainer>
      <UIBody>
        <UIJsonField
          items={items}
          field={[
            {
              key: "password",
              type: "password",
              label: "Pwd",
              size: { xs: 6, sm: 6, md: 5, lg: 5 }
            },
            {
              key: "total",
              type: "money",
              size: { xs: 6, sm: 6, md: 5, lg: 5 }
            }
          ]}
          setValue={(v: any, k: any) => {
            (items as any)[k] = v;
            setItems({ ...items });
          }}
        />
      </UIBody>
    </UIContainer>
  );
};
