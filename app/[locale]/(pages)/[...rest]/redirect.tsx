import { getCookie } from '@component/Utils';
import { redirect } from 'next/navigation';
import { JSX } from 'react/jsx-runtime';

const Redirect = (): JSX.Element => {
  const lang = getCookie('NEXT_LOCALE');
  return redirect(`/${lang}/error`);
};

export default Redirect;
