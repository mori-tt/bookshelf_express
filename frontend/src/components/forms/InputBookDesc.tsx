import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInputs } from "../../types";

interface Props {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const InputBookDesc = ({ register, errors }: Props) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-description">
        本の概要
      </label>
      <textarea
        id="book-description"
        rows={5}
        {...register("description", {
          required: "概要を入力してください。",
          maxLength: { value: 100, message: "100文字以内で入力してください。" },
        })}
      />
      {errors.description && (
        <div className="error-msg">{errors.description.message}</div>
      )}
    </>
  );
};

export default InputBookDesc;
