import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { FormModel } from 'src/app/model/components/form.model';

@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
        InputNumberModule,
        DropdownModule,
        RadioButtonModule,
        CheckboxModule,
        ToastModule,
        InputTextareaModule,
        PasswordModule
    ],
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    providers: [MessageService]
})
export class DynamicFormComponent implements OnInit {

    DynamicFormProps!: FormModel.IForm;

    @Input('props') set props(value: FormModel.IForm) {
        this.DynamicFormProps = value;

        if (this.DynamicFormProps) {
            const form = document.getElementById(`${this.props.id}`) as HTMLElement;
            if (form) {
                form.classList.add(`${this.DynamicFormProps.class}`);
            }
        }
    }

    get props(): FormModel.IForm {
        return this.DynamicFormProps;
    }

    FormGroup: FormGroup

    constructor(
        private _formBuilder: FormBuilder,
        private _messageService: MessageService,
    ) {
        this.FormGroup = this._formBuilder.group({});
    };

    ngOnInit(): void {
        this.props.fields.forEach((item) => {
            if (item.type == 'number') {
                if (item.required) {
                    this.FormGroup.addControl(item.id, new FormControl(0, [Validators.required, Validators.min(1)]));
                } else {
                    this.FormGroup.addControl(item.id, new FormControl(0, [Validators.required, Validators.min(0)]));
                }
            };

            if (item.type == 'date') {
                this.FormGroup.addControl(item.id, new FormControl(new Date(), [Validators.required]));
            };

            if (item.type == 'select' && item.id.includes('id')) {
                this.FormGroup.addControl(item.id, new FormControl(0, [Validators.required]));
            };

            if (item.type == 'select' && !item.id.includes('id')) {
                this.FormGroup.addControl(item.id, new FormControl(0, [Validators.required]));
            };

            if (item.type != 'number' && item.type != 'date' && item.type != 'select') {
                if (item.value) {
                    this.FormGroup.addControl(item.id, new FormControl(item.value, [Validators.required]));
                } else {
                    this.FormGroup.addControl(item.id, new FormControl("", [Validators.required]));
                }
            };
        });
    };

    onGetFormValue(): any {
        this._messageService.clear();

        let invalidArr = [];

        this.DynamicFormProps.fields.forEach((item) => {
            if (item.required && this.FormGroup.get(item.id)?.invalid && item.type != 'number') {
                this._messageService.add({ severity: 'error', summary: 'Oops', detail: `${item.label} Tidak Boleh Kosong` });
                invalidArr.push(item);
            };

            if (item.required && item.type == 'number' && this.FormGroup.get(item.id)?.invalid) {
                this._messageService.add({ severity: 'error', summary: 'Oops', detail: `${item.label} Tidak Boleh 0` });
                invalidArr.push(item);
            };

            if (!item.required && item.type == 'number' && this.FormGroup.get(item.id)?.invalid) {
                this._messageService.add({ severity: 'error', summary: 'Oops', detail: `${item.label} Tidak Boleh Kosong` });
                invalidArr.push(item);
            };
        });

        return invalidArr.length ? false : this.FormGroup.value;
    };

    onSetFormValue(): any {
        for (let item in this.props.defaultValue) {

            if (item.includes('tanggal') || item.includes('tgl')) {
                this.FormGroup.get(item)?.setValue(new Date(this.props.defaultValue[item]));
            }

            this.FormGroup.get(item)?.setValue(this.props.defaultValue[item]);
        }
    };

    handleChangeInputText(args: any, fields: FormModel.IFormFields) {
        return fields.onChange?.(args.target.value);
    }

    handleChangeDropdown(args: any, fields: FormModel.IFormFields): any {
        let data = null;

        if (fields.dropdownProps.optionValueAlternative) {
            data = fields.dropdownProps.options.find((item: any) => { return item[fields.dropdownProps.optionValueAlternative] == args.value });
        } else {
            data = fields.dropdownProps.options.find((item: any) => { return item[fields.dropdownProps.optionValue] == args.value });
        }

        return fields.onChange?.(data);
    }

    handleFilterDropdown(args: any, fields: FormModel.IFormFields): any {
        return fields?.onFilter?.(args);
    }

    onResetForm(): any {
        this.DynamicFormProps.fields.forEach((item) => {
            if (item.id == 'upliner') {
                this.FormGroup.get(item.id)?.setValue(null);
            }
            this.FormGroup.get(item.id)?.setValue(item.value);
        });
    };
}
