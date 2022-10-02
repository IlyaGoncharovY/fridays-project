import React from 'react';
import SuperInputText from "../common/super-input/SuperInputText";
import SuperButton from "../common/super-button/SuperButton";
import SuperCheckbox from "../common/super-checkbox/SuperCheckbox";
import SuperEditableSpan from "../common/super-editableSpan/SuperEditableSpan";
import SuperRadio from "../common/super-radio/SuperRadio";
import SuperSelect from "../common/super-select/SuperSelect";
import s from "./testComponent.module.scss"

export const TestComponent = () => {
    return (
        <div className={s.testComponentContainer}>
            <SuperInputText/>
            <SuperButton/>
            <SuperCheckbox/>
            <SuperEditableSpan/>
            <SuperRadio/>
            <SuperSelect/>
        </div>
    );
};

