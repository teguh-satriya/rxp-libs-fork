import UISelectField from './UISelectField';
import React, { useState } from "react";
import UIField, { UIFieldProps } from './UIField';
import UIText from './UIText';
import { Button, View } from 'reactxp';
import { uistyle } from '../utils/ConfigUtil';

interface UITagFieldProps extends UIFieldProps {
    items: any[];
    value: string | number;
    setValue: (value: any) => any;
}

export default (p: UITagFieldProps) => {
    const [selected, setSelected] = useState<any>([]);
    let fieldStyle = uistyle(`field.field`, { 
        flexWrap:"wrap", 
        borderBottomWidth: 0, 
        backgroundColor: "#ececeb", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        padding: 5, 
        minHeight: 40 
    });

    p.setValue(selected);

    const deleteSelected = (idx: number) => {
        let arr = [...selected];
        arr.splice(idx, 1);

        setSelected(arr);
    }
    return (
        <View>
            <UIField label={p.label} fieldStyle={fieldStyle}>
                {selected.map((val: any, idx: number) => {
                    return <View key={idx}
                        style={{ marginRight: 5, paddingLeft: 5, flexDirection: "row", alignItems: "center", padding: 3, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 7 }}>
                        <UIText size="small">
                            {val}
                        </UIText>
                        <Button onPress={() => { deleteSelected(idx) }}><UIText>x</UIText></Button>
                    </View>
                })}
            </UIField>
            <UISelectField items={p.items} value={""}
                setValue={(v) => {
                    setSelected([...selected, v]);
                }}>
            </UISelectField>
        </View>


    );
};