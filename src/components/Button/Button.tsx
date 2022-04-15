import styles from './Button.module.scss';

type BUTTON_TYPE = 'FULL' | 'OUTLINED';
type BUTTON_COLOR = 'GREEN' | 'BLUE' | 'TRANSPARENT';

interface buttonProps {
  text: String;
  onClick?: Function;
  type: BUTTON_TYPE;
  color: BUTTON_COLOR;
  className?: String;
  btnWidth?: Number;
}

function Button({
  text,
  onClick,
  type,
  color,
  className,
  btnWidth
}: buttonProps) {
  let cls = '';
  if (type === 'FULL' && color === 'GREEN') {
    cls = styles.fullGreen;
  } else if (type === 'FULL' && color === 'BLUE') {
    cls = styles.fullBlue;
  } else if (type === 'OUTLINED' && color === 'GREEN') {
    cls = styles.outlinedGreen;
  } else if (type === 'OUTLINED' && color === 'BLUE') {
    cls = styles.outlinedBlue;
  } else if (type === 'OUTLINED' && color === 'TRANSPARENT') {
    cls = styles.outlined;
  }
  return (
    <button
      className={`${styles.btn} ${cls} ${className ? className : ''}`}
      onClick={onClick ? () => onClick() : undefined}
      style={{ width: btnWidth ? `${btnWidth}px` : 'auto' }}
    >
      {text}
    </button>
  );
}

export default Button;
