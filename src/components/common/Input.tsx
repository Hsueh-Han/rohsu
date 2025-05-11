import { KeyboardEvent, ChangeEvent } from 'react';
import { UseFormRegister, FieldValues, Path, RegisterOptions, FieldErrors } from 'react-hook-form';

interface Props<T extends FieldValues> {
    id: Path<T>
    customClassName?: string
    type?: 'text' | 'password'
    hasNumberFormat?: boolean
    labelText?: string
    placeholder?: string
    defaultValue?: string
    value?: string | number
    changeHandler?: (e: ChangeEvent) => void
    enterHandler?: (e: KeyboardEvent) => void
    register?: UseFormRegister<T>
    rules?:  RegisterOptions<T, Path<T>>
    errors?: FieldErrors<FieldValues>
}

function Input<T extends FieldValues>({
        id,
        customClassName,
        type = 'text',
        hasNumberFormat,
        labelText,
        placeholder,
        defaultValue,
        value,
        register,
        rules,
        errors,
        changeHandler,
        enterHandler,
    }: Props<T>) {

    const onChangeEvent = (e: ChangeEvent) => {
        if (changeHandler) {
            changeHandler(e)
        }
    };

    const onEnterDownEvent = (e: KeyboardEvent) => {
        if (enterHandler && (e.code === 'NumpadEnter' || e.code === 'Enter')) {
            enterHandler(e);
        }
    };
    return (
        <div className={`relative pb-4 ${customClassName || ''}`}>
            {
                labelText &&
                <label
                    className={
                        `inline-block indent-1 text-sm
                        ${errors?.[id] ? 'text-rps-danger' : 'text-rps-primary'}`
                    }
                    htmlFor={id}
                >
                    {labelText}
                </label>
            }
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                className={
                    `w-full border rounded-md pl-2 py-1 outline-none transition-all
                    ${errors?.[id] ? 'border-rps-danger focus:border-rps-danger' : 'hover:border-rps-secondary focus:border-rps-secondary'}`
                }
                onKeyDown={e => onEnterDownEvent(e)}
                {...(register ?
                    register(id, rules)
                    :
                    {
                        onChange: e => onChangeEvent(e)
                    }
                )}
                onInput={
                    hasNumberFormat ?
                    (e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '').replace(/^0+/, '')
                    :
                    () => {}
                }
            />
            {
                errors?.[id] && errors[id]?.message &&
                <span className="absolute bottom-0 right-0 text-xs text-rps-danger">
                    {errors[id].message as string}
                </span>
            }
        </div>
    )
};
export default Input