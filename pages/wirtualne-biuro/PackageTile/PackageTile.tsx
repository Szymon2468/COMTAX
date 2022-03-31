import styles from './PackageTile.module.scss';

interface PackageTile {
  title: string;
  content: JSX.Element;
  price: number;
  className?: string;
}

function PackageTile({ title, content, price, className }: PackageTile) {
  return (
    <div className={`${styles.packageTile} ${className}`}>
      <h2>{title}</h2>
      {content}
      <div className={styles.price}>{price} zł / miesiąc</div>
    </div>
  );
}

export default PackageTile;
