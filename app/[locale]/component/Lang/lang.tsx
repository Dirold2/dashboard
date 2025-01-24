import { useTranslations } from 'next-intl';
import React from 'react';

interface LangInputProps {
  translate: string;
}

const LangInput: React.FC<LangInputProps> = ({ translate }) => {
  const t = useTranslations('');

  return t(translate);
};

export default LangInput;
