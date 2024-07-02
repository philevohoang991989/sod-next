import { useReducer } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import Shandcn UI components
import { Input } from "@/components/ui/input"; // Import Shandcn UI Input
import { UseFormReturn } from "react-hook-form";

type TimeInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
};

export default function TimeInput(props: TimeInputProps) {
  const initialValue = props.form.getValues()[props.name] || "00:00:00";

  const [value, setValue] = useReducer((state: string, next: string) => {
    // Remove non-digit and non-colon characters
    const cleanedValue = next.replace(/[^\d:]/g, "");
    
    // Split cleanedValue into hours, minutes, and seconds
    const [hoursPart, restPart] = cleanedValue.split(":");
    let hours = hoursPart.padStart(2, "0").slice(0, 2); // Ensure two characters for hours
    let minutes = "";
    let seconds = "";

    if (restPart) {
      const parts = restPart.split(":");
      minutes = parts[0].padStart(2, "0").slice(0, 2); // Ensure two characters for minutes
      if (parts.length > 1) {
        seconds = parts[1].padStart(2, "0").slice(0, 2); // Ensure two characters for seconds
      }
    }

    // Convert hours to minutes if necessary
    if (!restPart && cleanedValue.length >= 3) {
      hours = cleanedValue.slice(0, 2);
      minutes = cleanedValue.slice(2, 4).padStart(2, "0");
    }

    // Combine hours, minutes, and seconds with colons
    let formattedValue = `${hours}`;
    if (minutes) {
      formattedValue += `:${minutes}`;
    }
    if (seconds) {
      formattedValue += `:${seconds}`;
    }

    return formattedValue;
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    realChangeFn(formattedValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(e) => {
                  setValue(e.target.value);
                  handleChange(_change, e.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}