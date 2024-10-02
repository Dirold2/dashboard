import styles from './style/footer.module.css';
import { siteTitle } from '@config';

interface FooterProps {
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ style }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={style} className={`${styles.footer} ${`center`}`}>
      {siteTitle} &copy; {currentYear}
    </footer>
  );
};

export default Footer;
