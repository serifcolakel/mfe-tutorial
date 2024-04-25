import { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea, type TextareaProps } from '../ui/textarea';

type TextAreaFieldProps<T extends FieldValues> = {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  description?: string;
} & TextareaProps;

export function TextAreaField<T extends FieldValues>({
  control,
  label,
  name,
  description,
  ...props
}: TextAreaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
