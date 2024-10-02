import React from 'react';
import { useTranslations } from 'next-intl';

interface LangInputProps {
  translate: string;
}

const LangInput: React.FC<LangInputProps> = ({ translate }) => {
  const t = useTranslations('');

  return t(translate);
};

export default LangInput;