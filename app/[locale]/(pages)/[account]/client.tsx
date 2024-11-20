"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";


const {data: session} = useSession()
const pathname = usePathname();
const currentPath = pathname.split("/")[2]; // Получаем текущую часть пути
export const isUserPath = session?.user?.name === currentPath;
