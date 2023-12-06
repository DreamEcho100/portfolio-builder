import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "../../ui/select";

type Item = Parameters<typeof SelectItem>[0] & { "data-type"?: "item" };
type CustomGroup = Omit<Parameters<typeof SelectGroup>[0], "children"> & {
  label: Parameters<typeof SelectLabel>[0] | string;
  children: Parameters<typeof SelectItem>[0][];
  "data-type": "group";
};
type Group = Parameters<typeof SelectItem>[0][];

export type SelectBaseProps = Parameters<typeof Select>[0] & {
  id?: string;
  trigger?: Parameters<typeof SelectTrigger>[0];
  valueHolder?: Parameters<typeof SelectValue>[0];
  content?: Parameters<typeof SelectContent>[0];
  options: (Item | CustomGroup | Group)[];
};

function SelectBaseContentItem(props: SelectBaseProps["options"][number]) {
  if (Array.isArray(props)) {
    return (
      <SelectGroup>
        {props.map((item) => {
          return <SelectItem key={item.value} {...item} />;
        })}
      </SelectGroup>
    );
  }

  if (props["data-type"] === "group") {
    const { label, children, ..._props } = props;

    return (
      <SelectGroup {..._props}>
        {typeof label === "string" ? (
          <SelectLabel>{label}</SelectLabel>
        ) : (
          <SelectLabel {...label} />
        )}
        {children.map((item) => {
          return <SelectItem key={item.value} {...item} />;
        })}
      </SelectGroup>
    );
  }

  return <SelectItem {...props} />;
}

export default function SelectBase({
  trigger,
  valueHolder,
  content,
  options,
  id,
  ...props
}: SelectBaseProps) {
  return (
    <Select {...props}>
      <SelectTrigger id={id} {...trigger}>
        <SelectValue className="capitalize" {...valueHolder} />
      </SelectTrigger>
      <SelectContent {...content}>
        {options.map((option) => (
          <SelectBaseContentItem {...option} />
        ))}
      </SelectContent>
    </Select>
  );
}
