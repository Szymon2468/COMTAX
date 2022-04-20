export const offers: JSX.Element[] = [
  <p key={'o-1'}>adres do korespondencji</p>,
  <p key={'o-2'}>odbiór przesyłek listowych</p>,
  <p key={'o-3'}>przechowywanie przesyłek listowych</p>,
  <p key={'o-4'}>odbiór przesyłek kurierskich</p>,
  <p key={'o-5'}>przechowywanie przesyłek kurierskich</p>,
  <p key={'o-6'}>adres do rejestracji firmy</p>,
  <p key={'o-7'}>możliwość umieszczenia adresu na materiałach reklamowych</p>,
  <p key={'o-8'}>powiadamianie o odebranej korespondencji (e-mail)</p>,
  <p key={'o-9'}>
    dostęp do sali konferencyjnej/pokoju spotkań biznesowych, stanowiska pracy
    wraz z miejscem parkingowym <sup>2</sup>
  </p>,
  <p key={'o-10'}>
    skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres
    e-mail <sup>3</sup>
  </p>,
  <p key={'o-11'}>dyżur telefoniczny do godz. 20:00</p>,
  <p key={'o-12'}>obsługa poczty wychodzącej</p>
];

export const addedOffers: JSX.Element[] = [
  <p key={'ao-1'}>powiadamianie o odebranej korespondencji (e-mail)</p>,
  <p key={'ao-2'}>obsługa poczty wychodzącej</p>,
  <p key={'ao-3'}>fakturowanie</p>,
  <p key={'ao-4'}>
    dostęp do sali konferencyjnej/pokoju spotkań biznesowych wraz z miejscem
    parkingowym
  </p>,
  <p key={'ao-5'}>dostęp do stanowiska pracy wraz z miejscem parkingowym</p>,
  <p key={'ao-6'}>
    skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres
    e-mail
  </p>,
  <p key={'ao-7'}>
    przesyłanie odebranej korespondencji na wskazany adres w Polsce (raz w
    miesiącu)
  </p>
];

export const priceList: JSX.Element[] = [
  <p key={'pl-1'}>płatność za 1 miesiąc z góry</p>,
  <p key={'pl-2'}>płatność za 6 miesięcy z góry</p>,
  <p key={'pl-3'}>płatność za 12 miesięcy z góry</p>
];

interface PackageTileData {
  title: string;
  content: JSX.Element;
  price: number;
}

export const packageTiles: PackageTileData[] = [
  {
    title: 'POCZTA',
    content: (
      <>
        <p className='smaller'>
          <strong>Usługi w pakiecie: </strong>
        </p>
        <p className='smaller'>{'>'} adres do korespondencji</p>
        <p className='smaller'>{'>'} odbiór przesyłek listowych</p>
        <p className='smaller'>
          {'>'} przechowywanie przesyłek listowych (30 dni)
        </p>
        <p className='smaller'>{'>'} odbiór przesyłek kurierskich</p>
        <p className='smaller'>
          {'>'} przechowywanie przesyłek kurierskich (14 dni)
        </p>
        <br />
        <p className='smaller'>
          Pakiet dostępny wyłącznie dla osób nieprowadzących działalności
          gospodarczej
        </p>
      </>
    ),
    price: 20
  },
  {
    title: 'ADRES',
    content: (
      <>
        <p className='smaller'>
          <strong>Usługi z pakietu POCZTA plus:</strong>
        </p>
        <p className='smaller'>{'>'} adres do rejestracji firmy</p>
        <p className='smaller'>
          {'>'} możliwość umieszczenia adresu na materiałach reklamowych
        </p>
      </>
    ),
    price: 40
  },
  {
    title: 'ADRES+',
    content: (
      <>
        <p className='smaller'>
          <strong>Usługi z pakietu ADRES plus:</strong>
        </p>
        <p className='smaller'>
          {'>'} powiadamianie o odebranej korespondencji (e-mail)
        </p>
        <p className='smaller'>
          {'>'} dostęp do sali konferencyjnej/pokoju spotkań biznesowych,
          stanowiska pracy wraz z miejscem parkingowym <br />
          (2h/miesiąc) <sup>1</sup>
        </p>
      </>
    ),
    price: 60
  },
  {
    title: 'FIRMA',
    content: (
      <>
        <p className='smaller'>
          <strong>Usługi z pakietu ADRES+ plus:</strong>
        </p>
        <p className='smaller'>
          {'>'} dostęp do sali konferencyjnej/pokoju spotkań biznesowych,
          stanowiska pracy wraz z miejscem parkingowym <br />
          (4h/miesiąc) <sup>1</sup>
        </p>
        <p className='smaller'>
          {'>'} skanowanie korespondencji i przesyłanie w formacie pdf na
          wskazany adres e-mail <br />
          (100 stron/miesiąc) <sup>2</sup>
        </p>
        <p className='smaller'>{'>'} obsługa poczty wychodzącej</p>
      </>
    ),
    price: 100
  },
  {
    title: 'FIRMA+',
    content: (
      <>
        <p className='smaller'>
          <strong>Usługi z pakietu FIRMA plus:</strong>
        </p>
        <p className='smaller'>
          {'>'} dostęp do sali konferencyjnej/pokoju spotkań biznesowych,
          stanowiska pracy wraz z miejscem parkingowym <br />
          (6h/miesiąc) <sup>1</sup>
        </p>
        <p className='smaller'>
          {'>'} skanowanie korespondencji i przesyłanie w formacie pdf na
          wskazany adres e-mail <br />
          (150 stron/miesiąc) <sup>2</sup>
        </p>
        <p className='smaller'>{'>'} dyżur telefoniczny do godz. 20:00</p>
      </>
    ),
    price: 140
  }
];

export const comparisingTableSelectOptions: string[] = [
  'POCZTA',
  'ADRES',
  'ADRES+',
  'FIRMA+'
];
