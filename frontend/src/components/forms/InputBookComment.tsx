import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInputs } from "../../types";

interface Props {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const InputBookComment = ({ register, errors }: Props) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-comment">
        本の感想
      </label>
      <textarea
        id="book-comment"
        rows={5}
        {...register("comment", {
          required: "感想を入力してください。",
          maxLength: { value: 100, message: "100文字以内で入力してください。" },
        })}
      />
      {errors.comment && (
        <div className="error-msg">{errors.comment.message}</div>
      )}
    </>
  );
};

export default InputBookComment;
