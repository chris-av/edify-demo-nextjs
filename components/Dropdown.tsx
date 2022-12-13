interface ComponentProps {
  name: string;
  value: string;
  values: {
    key?: string;
    value: string;
  }[];
  handler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


export default function Dropdown({ name, value, values, handler } : ComponentProps) {
  return (
    <select onChange={handler} name={name} className="p-2" value={value}>
      { values.map(({ key, value }) => (
        <option key={key ? key : value} value={value}>{value}</option>
      )) }
    </select>
  );
}

