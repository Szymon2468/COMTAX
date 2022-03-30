import styles from './VirtualOffice.module.scss';

function VirtualOffice() {
  return (
    <section>
      <div className={styles.landingPage}>
        <div className={`container ${styles.virtualOfficeContainer}`}>
          <header>
            <h1 className={styles.title}>
              PROWADZIMY USŁUGI Z ZAKRESU KSIĘGOWOŚCI OD PONAD 20 LAT <br />
              <br />
              COMTAX - Księgowość, której możesz zaufać
            </h1>
          </header>
        </div>
      </div>
    </section>
  );
}

export default VirtualOffice;
