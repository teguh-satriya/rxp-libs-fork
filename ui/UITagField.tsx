import UISelectField from './UISelectField';
import React, { useEffect, useState } from "react";
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
    const [data, setData] = useState<any>([]);
    const [_data, _setData] = useState<any>([]);

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
    
    const funcSearch = (value: string) => {
        if (value) {
            let search = data.filter(
                (x: any) =>
                x.value.toLowerCase().includes(value.toLowerCase()) ||
                x.label.toLowerCase().includes(value.toLowerCase())
            );
            _setData([...search]);
        } else {
            _setData([...data]);
        }
        
    };

    const deleteSelected = (idx: number) => {
        let arr = [...selected];
        arr.splice(idx, 1);

        setSelected(arr);
    }
    useEffect(() => {
        setData([...p.items]);
        _setData([...p.items]);
    },[p.items]);

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
            <UISelectField items={_data} value={""}
                setValue={(v) => {
                    setSelected([...selected, v]);
                }}
                search={true}
                onSearch = {funcSearch}
                onDismiss={() => _setData([...data])}
            >
            </UISelectField>
        </View>


    );
};