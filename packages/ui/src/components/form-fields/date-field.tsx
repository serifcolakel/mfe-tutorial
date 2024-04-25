import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '../../lib';
import { Button } from '../ui';
import { Calendar } from '../ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type DateFieldProps<T extends FieldValues> = {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  description?: string;
};

export function DateField<T extends FieldValues>({
  control,
  label,
  name,
  description,
}: DateFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                  variant="outline"
                >
                  {field.value ? (
                    format(field.value, 'yyyy-MM-dd')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                mode="single"
                onSelect={field.onChange}
                selected={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
