import { getCookie } from "@cmp/Utils";
import { redirect } from "next/navigation";
import { JSX } from "react/jsx-runtime";

const Redirect = async (): Promise<JSX.Element> => {
  const lang = await getCookie('NEXT_LOCALE');
  
  // Используем функцию redirect из next/navigation
  return redirect(`/${lang}/error`);
};

export default Redirect;