import styles from './RoomTile.module.scss';

interface IRoomTileType {
  img: string;
  alt: string;
  name: string;
}

function RoomTile({ img, name, alt }: IRoomTileType) {
  return (
    <div className={styles.RoomTile}>
      <img
        src={img}
        className={styles.img}
        width={300}
        height={200}
        alt={alt}
      />
      <h3 className={styles.name}>{name?.toUpperCase()}</h3>
      <p className={styles.info}>ul. Krasińskiego 29</p>
      <p className={styles.more}>
        Kliknij, aby dowiedzieć się więcej o tej salce
      </p>
    </div>
  );
}

export default RoomTile;
