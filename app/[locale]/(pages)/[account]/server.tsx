import { getSecondPathPart } from '@component/Utils';

export async function PageServer({
  pathname,
}: {
  pathname: string;
}): Promise<{ path: string }> {
  const path = getSecondPathPart(pathname);
  return { path };
}
