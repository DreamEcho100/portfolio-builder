import { init } from "@paralleldrive/cuid2";

const createRandomSlugLength = 10; // 50% odds of collision after ~51,386,368 ids
export function createRandomSlug() {
  return init({ length: createRandomSlugLength })();
}
