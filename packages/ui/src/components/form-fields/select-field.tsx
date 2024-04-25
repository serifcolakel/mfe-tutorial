import { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  description?: string;
  options: { label: string; value: string }[];
};

export function SelectField<T extends FieldValues>({
  control,
  label,
  name,
  description,
  options,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ label: itemLabel, value }) => (
                <SelectItem key={value} value={value}>
                  {itemLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
