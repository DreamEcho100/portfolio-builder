import type { Key, ReactNode } from "react";
import { isValidElement } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/common/ui/dropdown-menu";

type TReactNode =
  | Exclude<ReactNode, PromiseLike<ReactNode> | Iterable<ReactNode>>
  | string;

const isValidTReactNode = (item: unknown): item is TReactNode => {
  return (
    !item ||
    typeof item === "string" ||
    typeof item === "number" ||
    typeof item === "boolean" ||
    isValidElement(item)
  );
};
type OmitChildren<Item> = Omit<Item, "children">;

type DropdownMenuBuilderBasicElem =
  | ({ ["data-type"]: "label" } & Parameters<typeof DropdownMenuLabel>[0])
  | ({ ["data-type"]: "shortcut" } & Parameters<typeof DropdownMenuShortcut>[0])
  | ({ ["data-type"]: "separator" } & Parameters<
      typeof DropdownMenuSeparator
    >[0]);

type DropdownMenuBuilderItemElem = {
  ["data-type"]: "item";
  children:
    | TReactNode
    | (TReactNode | (DropdownMenuBuilderBasicElem & { key?: Key }))[];
} & OmitChildren<Parameters<typeof DropdownMenuItem>[0]>;

interface DropdownMenuBuilderSubElem {
  ["data-type"]: "sub";
  // children: TReactNode | (DropdownMenuBasicElem & { key?: Key })[];
  trigger: Parameters<typeof DropdownMenuSubTrigger>[0];
  portal?: Parameters<typeof DropdownMenuPortal>[0];
  content: OmitChildren<Parameters<typeof DropdownMenuSubContent>[0]> & {
    children:
      | ((
          | DropdownMenuBuilderBasicElem
          | DropdownMenuBuilderItemElem
          | DropdownMenuBuilderGroupElem
        ) & {
          key?: Key;
        })[]
      | Exclude<DropdownMenuBuilderGroupElem["children"], TReactNode>;
  };
  props?: OmitChildren<Parameters<typeof DropdownMenuSub>[0]>;
}

type DropdownMenuBuilderGroupElem = {
  ["data-type"]: "group";
  children:
    | TReactNode
    | ((
        | DropdownMenuBuilderBasicElem
        | DropdownMenuBuilderItemElem
        | DropdownMenuBuilderSubElem
      ) & {
        key?: Key;
      })[];
} & OmitChildren<Parameters<typeof DropdownMenuGroup>[0]>;

export type DropdownMenuBuilderElem =
  | DropdownMenuBuilderBasicElem
  | DropdownMenuBuilderItemElem
  | DropdownMenuBuilderSubElem
  | DropdownMenuBuilderGroupElem
  | Exclude<DropdownMenuBuilderGroupElem["children"], TReactNode>
  | TReactNode;

const DropdownMenuContentElemBuilder = (props: {
  item: DropdownMenuBuilderElem;
}): TReactNode => {
  if (isValidTReactNode(props.item)) return props.item;

  if (Array.isArray(props.item))
    return (
      <DropdownMenuGroup>
        {Array.isArray(props.item)
          ? props.item.map((subItem, subItemIndex) => (
              <DropdownMenuContentElemBuilder
                item={subItem}
                key={subItemIndex ?? subItem.key}
              />
            ))
          : props.item}
      </DropdownMenuGroup>
    );

  if (typeof props.item === "object" && "data-type" in props.item)
    switch (props.item["data-type"]) {
      case "label":
        return <DropdownMenuLabel {...props.item} />;
      case "shortcut":
        return <DropdownMenuShortcut {...props.item} />;
      case "separator":
        return <DropdownMenuSeparator {...props.item} />;
      case "group":
        return (
          <DropdownMenuGroup {...props.item}>
            {Array.isArray(props.item.children)
              ? props.item.children.map((subItem, subItemIndex) => (
                  <DropdownMenuContentElemBuilder
                    item={subItem}
                    key={subItemIndex ?? subItem.key}
                  />
                ))
              : props.item.children}
          </DropdownMenuGroup>
        );
      case "sub":
        return (
          <DropdownMenuSub {...props.item.props}>
            <DropdownMenuSubTrigger {...props.item.trigger} />
            <DropdownMenuPortal {...props.item.portal}>
              <DropdownMenuSubContent {...props.item.content}>
                {props.item.content.children.map((subItem, subItemIndex) => (
                  <DropdownMenuContentElemBuilder
                    item={subItem}
                    key={subItemIndex ?? subItem.key}
                  />
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      case "item":
        return (
          <DropdownMenuItem {...props.item}>
            {Array.isArray(props.item.children)
              ? props.item.children.map((subItem, subItemIndex) =>
                  isValidTReactNode(subItem) ? (
                    subItem
                  ) : (
                    <DropdownMenuContentElemBuilder
                      item={subItem}
                      key={subItemIndex ?? subItem.key}
                    />
                  ),
                )
              : props.item.children}
          </DropdownMenuItem>
        );
      default:
        return props.item;
    }

  return props.item;
};

const DropdownMenuContentBuilder = (props: {
  data: DropdownMenuBuilderElem[];
}) => {
  return (
    <DropdownMenuContent className="w-56">
      {props.data.map((item, index) => (
        <DropdownMenuContentElemBuilder item={item} key={index} />
      ))}
    </DropdownMenuContent>
  );
};

export default function DropdownMenuBuilder(props: {
  content: DropdownMenuBuilderElem[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContentBuilder data={props.content} />
    </DropdownMenu>
  );
}

/*
const dropdownData: DropdownMenuElem[] = [
  { "data-type": "label", children: "My Account" },
  { "data-type": "separator" },
  [
    {
      "data-type": "item",
      children: ["Profile", { "data-type": "shortcut", children: "⇧⌘P" }],
    },
    {
      "data-type": "item",
      children: ["Billing", { "data-type": "shortcut", children: "⌘B" }],
    },
    {
      "data-type": "item",
      children: ["Settings", { "data-type": "shortcut", children: "⌘S" }],
    },
    {
      "data-type": "item",
      children: [
        "Keyboard shortcuts",
        { "data-type": "shortcut", children: "⌘K" },
      ],
    },
  ],
  { "data-type": "separator" },
  [
    { "data-type": "item", children: "Team" },
    {
      "data-type": "sub",
      trigger: { children: "Invite users" },
      content: {
        children: [
          { "data-type": "item", children: "Email" },
          { "data-type": "item", children: "Message" },
          { "data-type": "separator" },
          { "data-type": "item", children: "More..." },
        ],
      },
    },
    {
      "data-type": "item",
      children: ["New Team", { "data-type": "shortcut", children: "⌘+T" }],
    },
  ],
  { "data-type": "separator" },
  { "data-type": "item", children: "GitHub" },
  { "data-type": "item", children: "Support" },
  { "data-type": "item", disabled: true, children: "API" },
  { "data-type": "separator" },
  {
    "data-type": "item",
    children: ["Log out", { "data-type": "shortcut", children: "⇧⌘Q" }],
  },
];
*/
