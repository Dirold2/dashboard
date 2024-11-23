import { getSecondPathPart } from '@cmp/Utils';

export async function PageServer({ pathname }: { pathname: string }): Promise<{ path: string }> {
  const path = getSecondPathPart(pathname);
  return { path };
}