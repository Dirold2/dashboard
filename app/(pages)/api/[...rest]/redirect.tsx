import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JSX } from "react/jsx-runtime";

const Redirect = async (): Promise<JSX.Element> => {
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')

  // Используем функцию redirect из next/navigation
  return redirect(`/${lang}/error`);
};

export default Redirect;