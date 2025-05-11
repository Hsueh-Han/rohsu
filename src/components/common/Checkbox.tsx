import { ChangeEvent } from 'react';
import { UseFormRegister, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface Props<T extends FieldValues> {
    id: Path<T>
    customClassName?: string
    labelText?: string
    register?: UseFormRegister<T>
    rules?:  RegisterOptions<T, Path<T>>
    changeHandler?: (e: ChangeEvent) => void
}

function Checkbox<T extends FieldValues>({
        id,
        customClassName,
        labelText,
        register,
        rules,
        changeHandler
    }: Props<T>) {

    const onChangeEvent = (e: ChangeEvent) => {
        if (changeHandler) {
            changeHandler(e)
        }
    };
    return(
        <div className={`mb-4 ${customClassName || ''}`}>
            <input
                type="checkbox"
                id="isCheck"
                {...(register ?
                    register(id, rules) : { onChange: e => onChangeEvent(e) }
                )}
            />
            <label
                htmlFor="isCheck"
                className="ml-2 select-none"
            >
                {labelText}
            </label>
        </div>
    );
};
export default Checkbox