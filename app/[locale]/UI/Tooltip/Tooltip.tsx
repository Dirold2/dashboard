import { useTranslations } from 'next-intl';
import TooltipClient from './cmp/TooltipClient';
import { JSX } from 'react/jsx-runtime';

interface TooltipProps {
  content: string;
  children: JSX.Element;
  position?: 'top' | 'right' | 'bottom' | 'left';
  translation?: boolean,
  delay?: number;
  visible?: boolean;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const t = useTranslations(`Tooltip`);
  let translatedContent: string;

  if (props.translation) {
    translatedContent = t(props.content);
  } else {
    translatedContent = props.content;
  }

  return (
    <TooltipClient {...props} content={translatedContent} />
  );
};

export default Tooltip;
