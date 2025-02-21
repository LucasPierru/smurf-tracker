import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import InputError from "../errors/input-error/input-error";

type TextareaProps = {
  id: string;
  error?: FieldError;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef(
  (
    { id, error, ...otherProps }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        <textarea
          id={id}
          className="bg-white/5 bg-secondary text-foreground placeholder:text-foreground w-full focus:outline-0 py-2 px-4 rounded-lg border border-gray-400 text-lg resize-none min-h-36"
          ref={ref}
          {...otherProps}
        />
        {error && <InputError error={error} />}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
