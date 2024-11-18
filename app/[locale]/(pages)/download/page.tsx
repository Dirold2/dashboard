import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const fileName = 'Lost_Souls_Optimize.zip' // Имя файла для скачивания
  const filePath = path.join('public', 'documents', fileName)

  try {
    // Проверяем, существует ли файл
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Читаем файл
    const fileBuffer = fs.readFileSync(filePath)

    // Создаем и возвращаем ответ
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename=${fileName}`,
        'Content-Type': 'application/zip',
      },
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}