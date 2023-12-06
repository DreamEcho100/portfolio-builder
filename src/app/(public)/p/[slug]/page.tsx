import { db } from "~/server/db";
import CustomPageScreen from "./screen";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getData(slug: string) {
  const result = await db.query.customPages.findFirst({
    with: { socialLinks: true, seo: true, profileImage: true },
    where(fields, operators) {
      return operators.eq(fields.slug, slug);
    },
  });

  if (!result) {
    return notFound();
  }

  return result;
}

export type CustomPage = Awaited<ReturnType<typeof getData>>;

export default async function CustomPage(props: { params: { slug: string } }) {
  const result = await db.query.customPages.findFirst({
    with: { socialLinks: true, seo: true, profileImage: true },
    where(fields, operators) {
      return operators.eq(fields.slug, props.params.slug);
    },
  });

  if (!result) {
    return notFound();
  }

  return <CustomPageScreen data={result} />;
}
