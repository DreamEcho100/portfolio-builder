import type { ReactNode } from "react";
import Header, { type HeaderProps } from "../common/Layout/Dashboard/Header";

type Props = HeaderProps & {
  children?: ReactNode;
  title: string;
};

const CollectionPageHeader = ({ children, title, ...props }: Props) => {
  return (
    <Header type="collectionPageMainHeader" {...props}>
      <h1 className="m-0 p-0">{title}</h1>
      {children && (
        <div className="flex flex-wrap gap-2 ml-auto rtl:ml-0 rtl:mr-auto">
          {children}
        </div>
      )}
    </Header>
  );
};

export default CollectionPageHeader;
