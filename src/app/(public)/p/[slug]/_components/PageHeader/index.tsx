import { Fragment, type ReactNode } from "react";

import { Link } from "react-router-dom";
import usePagePath from "./usePagePath";
import { FiChevronRight } from "react-icons/fi";
import Header from "~components/common/Layout/Dashboard/Header";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return <Header type="profilePageMainHeader">{children}</Header>;
};

function PageHeaderTitle({
  as = "h1",
  title,
  children
}: {
  title: string;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}) {
  const Title = as;
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Title title={title} className="m-0 text-h1 truncate">{title}</Title>
      {children}
    </div>
  );
}

function PageHeaderPath({ path }: { path?: { name: string; url?: string }[] }) {
  const pagePath = usePagePath();
  return (
    <div className="flex gap-2">
      {(path || pagePath)?.map(({ name, url }, index) => {
        let arrow: ReactNode = null;
        if (index != 0) {
          arrow = <FiChevronRight className="rtl:rotate-180" />;
        }

        if (url)
          return (
            <Fragment key={name}>
              {arrow}
              <Link to={url}>{name}</Link>
            </Fragment>
          );

        return (
          <Fragment key={name}>
            {arrow}
            <span key={url}>{name}</span>
          </Fragment>
        );
      })}
    </div>
  );
}

PageHeader.Title = PageHeaderTitle;
PageHeader.Path = PageHeaderPath;
export default PageHeader;
