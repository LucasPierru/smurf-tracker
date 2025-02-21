import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import InputError from "../errors/input-error/input-error";

type InputProps = {
  id: string;
  error?: FieldError;
  type: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
  (
    { id, error, type, ...otherProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          id={id}
          type={type}
          className="bg-white/5 text-foreground placeholder:text-foreground w-full focus:outline-0 py-2 px-4 rounded-lg border border-gray-400 text-lg"
          ref={ref}
          {...otherProps}
        />
        {error && <InputError error={error} />}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
