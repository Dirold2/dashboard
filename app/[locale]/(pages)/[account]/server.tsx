import { getSecondPathPart } from '@cmp/Utils';

export async function PageServer({ pathname }: { pathname: string }) {
  const path = getSecondPathPart(pathname);
  return { path };
}
