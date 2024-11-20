import { useTranslations } from 'next-intl';
import TooltipClient from './cmp/TooltipClient';
import { JSX } from 'react/jsx-runtime';

interface TooltipProps {
  content: string;
  children: JSX.Element;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  visible?: boolean;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const t = useTranslations(`Tooltip`);
  let translatedContent: string;

  try {
    translatedContent = t(props.content);
  } catch {
    // Если перевод отсутствует, используем оригинальный контент
    translatedContent = props.content;
  }

  return (
    <TooltipClient {...props} content={translatedContent} />
  );
};

export default Tooltip;
