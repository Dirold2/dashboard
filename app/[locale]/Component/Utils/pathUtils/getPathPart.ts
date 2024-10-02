export default function getPathPart(pathname: string): string {
    const pathParts = pathname.split('/');
    const path = '/' + pathParts[1];
    return path;
}