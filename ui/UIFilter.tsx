import React from "react";
import { View } from 'reactxp';
import { UIProps } from './Styles/Style';
import UIJsonField, { UIJsonFieldSingleProps } from './UIJsonField';

interface UIFilterProps extends UIProps {
    filed?: UIJsonFieldSingleProps[],
    items: any,
    setValue: any;
}

export default (p: UIFilterProps) => {
    return (
        <View style={p.style}>
            <UIJsonField
                field={p.filed}
                items={p.items}
                setValue={p.setValue} />
        </View>
    );
}