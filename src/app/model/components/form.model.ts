export namespace FormModel {
    export interface IForm {
        id: string;
        class: string;
        style: 'inline' | 'not_inline';
        state: 'write' | 'read';
        fields: IFormFields[];
        defaultValue?: any;
    }

    export interface DropdownProps {
        options: any[] | any;
        optionName: string;
        optionValue: string;
        optionValueAlternative?: string;
        customField?: DropdownCustomField;
        autoDisplayFirst?: boolean;
    }

    export interface DropdownCustomField {
        title: string;
        subtitle: string;
        description?: string;
        footer?: DropdownCustomFieldFooter;
    }

    export interface DropdownCustomFieldFooter {
        label: string;
        method: () => any;
    }

    export interface RadioButtonProps {
        name: string;
        label: string;
        value: string;
    }

    export interface CheckBoxProps {
        name: string;
        label: string;
        value: string;
    }

    export interface IFormFields {
        id: string;
        type: 'text' | 'date' | 'daterange' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'password';
        label: string;
        required: boolean;
        value: any;
        dropdownProps?: DropdownProps | any;
        radioButtonProps?: RadioButtonProps[] | any;
        checkBoxProps?: CheckBoxProps[] | any;
        textareaRow?: number;
        hidden?: boolean;
        readonly?: boolean;
        onChange?: (args: any) => any;
        onFilter?: (args: any) => any;
    }
}