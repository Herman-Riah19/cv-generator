"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "email" | "tel" | "month" | "number";
  textarea?: boolean;
  rows?: number;
  className?: string;
}

export function TextField<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  type = "text",
  textarea = false,
  rows = 4,
  className = "",
}: TextFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {textarea ? (
              <Textarea
                placeholder={placeholder}
                rows={rows}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}