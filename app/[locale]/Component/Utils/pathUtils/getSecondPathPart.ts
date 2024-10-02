export default function getSecondPathPart(pathname: string): string {
    const pathParts = pathname.split('/');
    let path = '';
    if (pathParts.length > 2) {
        path = '/' + pathParts[pathParts.length - 1];
    }
    return path;
}