import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type Props = {
  onValueChange: () => void;
  defaultValue?: string;
  items: { value: string; label: string }[];
  placeholder?: string;
};

export const SelectField = ({
  onValueChange,
  defaultValue,
  placeholder,
  items,
}: Props) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
