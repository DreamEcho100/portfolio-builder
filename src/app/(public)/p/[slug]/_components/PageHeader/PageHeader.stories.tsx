import type { Meta, StoryObj } from "@storybook/react";

import PageHeader from ".";
import { FiPlus } from "react-icons/fi";
import Button from "~components/Button";
import { t } from "i18next";

const meta: Meta<typeof PageHeader> = {
  component: PageHeader
};

export default meta;

type PageHeaderStory = StoryObj<typeof PageHeader>;

export const BasicWithOnlyTitle: PageHeaderStory = {
  render: () => (
    <PageHeader>
      <PageHeader.Title title="Page title" />
    </PageHeader>
  )
};

export const TitleAndButtons: PageHeaderStory = {
  render: () => (
    <PageHeader>
      <PageHeader.Title title="Page title">
        <Button startIcon={<FiPlus />}>{t("New")}</Button>
      </PageHeader.Title>
    </PageHeader>
  )
};

export const WithDefaultPagePath: PageHeaderStory = {
  render: () => (
    <PageHeader>
      <PageHeader.Title title="Page title">
        <Button startIcon={<FiPlus />}>{t("New")}</Button>
      </PageHeader.Title>
      <PageHeader.Path />
    </PageHeader>
  )
};

export const WithManualPathConfiguration: PageHeaderStory = {
  render: () => (
    <PageHeader>
      <PageHeader.Title title="Page title">
        <Button startIcon={<FiPlus />}>{t("New")}</Button>
      </PageHeader.Title>
      <PageHeader.Path
        path={[
          { name: "first" },
          { name: "second", url: "/path/to/second" },
          { name: "third", url: "/path/to/second" },
          { name: "4th", url: undefined }
        ]}
      />
    </PageHeader>
  )
};
