import React, { forwardRef } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const Input = forwardRef<any, InputProps>(({ ...props }, ref) => {
  const { error, ...restProps } = props;
  return (
    <div className="relative">
      <label
        htmlFor={restProps.id}
        className="text-sm font-medium text-gray-700 mb-1"
      >
        {restProps.placeholder}
      </label>
      <input
        ref={ref}
        autoComplete={restProps.name}
        {...restProps}
        className="p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-default focus:border-transparent border border-gray-300 w-full"
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block absolute">
          {`${error.message}`}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
