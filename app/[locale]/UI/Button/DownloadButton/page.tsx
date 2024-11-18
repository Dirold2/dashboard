export default function DownloadButton({ fileName }: { fileName: string, filePath: string }) {
    return (
        <a href="/api/download">
            <button>
                Скачать {fileName}
            </button>
        </a>
    )
}