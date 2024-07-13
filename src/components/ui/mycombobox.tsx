import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ComboProps {
    data: { value: string; label: string }[];
    placeholder: string;
    id: string;
    onValueChange: (field: string, value: string ) => void;
  }
const MyCombobox:React.FC<ComboProps> = ({ data, placeholder,id, onValueChange }) => {
  return (
    <Select onValueChange={value=>onValueChange(value,id)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default MyCombobox
