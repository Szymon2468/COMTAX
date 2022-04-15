import styles from './RoomTile.module.scss';

interface IRoomTileType {
  img: string;
  alt: string;
  name: string;
  price: number;
  date: string;
  startHour: string;
  endHour: string;
}

function RoomTile({
  img,
  name,
  price,
  date,
  alt,
  startHour,
  endHour
}: IRoomTileType) {
  return (
    <div className={styles.RoomTile}>
      <img src={img} alt={alt} className={styles.img} />
      <h3 className={styles.name}>{name?.toUpperCase()}</h3>
      <p className={styles.date}>
        Najbliszy wolny termin: {date} od {startHour} do {endHour}
      </p>
      <p className={styles.price}>{price}zł / godzinę</p>
    </div>
  );
}

export default RoomTile;
