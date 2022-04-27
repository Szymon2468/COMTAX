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

export interface ITableSelectOptions {
  label: string;
  value: string;
}

export const tableSelectOptions: ITableSelectOptions[] = [
  { label: 'POCZTA', value: 'poczta' },
  { label: 'ADRES', value: 'adres' },
  { label: 'ADRES+', value: 'adresPlus' },
  { label: 'FIRMA', value: 'firma' },
  { label: 'FIRMA+', value: 'firmaPlus' }
];

export interface IFacilities {
  adresKorespondencji: boolean;
  odbiorList: boolean;
  przechowywaniePrzesylek: string;
  odbiorKurier: boolean;
  przechowywanieKurier: string;
  adresFirmy: boolean;
  materialyReklamowe: boolean;
  odebranaKorespondencja: boolean;
  salaKonferencyjna: boolean | string;
  skanowanie: boolean | string;
  dyzur: boolean;
  obslugaPoczty: boolean;
}

export interface IPrices {
  oneMonth: JSX.Element;
  sixMonths: JSX.Element;
  year: JSX.Element;
}

export interface IAdditionalFacilities {
  odebranaKorespondencja: string | boolean;
  obslugaPoczty: string | boolean;
  fakturowanie: string;
  salaKonferencyjna: string;
  stanowiskoPracy: string;
  skanPDF: string;
  przesylanieNaAdres: string;
}

export interface ITableOffers {
  package: string;
  facilities: IFacilities;
  prices: IPrices;
  additionalFacilities: IAdditionalFacilities;
}

export const tableOffers: ITableOffers[] = [
  {
    package: 'poczta',
    facilities: {
      adresKorespondencji: true,
      odbiorList: true,
      przechowywaniePrzesylek: '30 dni',
      odbiorKurier: true,
      przechowywanieKurier: '14 dni',
      adresFirmy: false,
      materialyReklamowe: false,
      odebranaKorespondencja: false,
      salaKonferencyjna: false,
      skanowanie: false,
      dyzur: false,
      obslugaPoczty: false
    },
    prices: {
      oneMonth: <>30 zł / miesiąc</>,
      sixMonths: (
        <>
          150 zł <br /> (25 zł / miesiąc)
        </>
      ),
      year: (
        <>
          240 zł <br /> (20 zł / miesiąc)
        </>
      )
    },
    additionalFacilities: {
      odebranaKorespondencja: '1 zł / przesyłka',
      obslugaPoczty: '5 zł + opłata pocztowa / kurierska',
      fakturowanie: '20 zł do 15 dokumentów + 2 zł za każdy kolejny dokument',
      salaKonferencyjna: 'zgodnie z cennikiem sali konferencyjnej',
      stanowiskoPracy: '10 zł / 1h',
      skanPDF: '0,50 zł / strona',
      przesylanieNaAdres: '10 zł + opłata pocztowa / kurierska'
    }
  },
  {
    package: 'adres',
    facilities: {
      adresKorespondencji: true,
      odbiorList: true,
      przechowywaniePrzesylek: '30 dni',
      odbiorKurier: true,
      przechowywanieKurier: '14 dni',
      adresFirmy: true,
      materialyReklamowe: true,
      odebranaKorespondencja: false,
      salaKonferencyjna: false,
      skanowanie: false,
      dyzur: false,
      obslugaPoczty: false
    },
    prices: {
      oneMonth: <>50 zł / miesiąc</>,
      sixMonths: (
        <>
          270 zł <br /> (45 zł / miesiąc)
        </>
      ),
      year: (
        <>
          480 zł <br /> (40 zł / miesiąc)
        </>
      )
    },
    additionalFacilities: {
      odebranaKorespondencja: '1 zł / przesyłka',
      obslugaPoczty: '5 zł + opłata pocztowa / kurierska',
      fakturowanie: '20 zł do 15 dokumentów + 2 zł za każdy kolejny dokument',
      salaKonferencyjna: 'zgodnie z cennikiem sali konferencyjnej',
      stanowiskoPracy: '10 zł / 1h',
      skanPDF: '0,50 zł / strona',
      przesylanieNaAdres: '10 zł + opłata pocztowa / kurierska'
    }
  },
  {
    package: 'adresPlus',
    facilities: {
      adresKorespondencji: true,
      odbiorList: true,
      przechowywaniePrzesylek: '30 dni',
      odbiorKurier: true,
      przechowywanieKurier: '14 dni',
      adresFirmy: true,
      materialyReklamowe: true,
      odebranaKorespondencja: true,
      salaKonferencyjna: '2h / miesiąc',
      skanowanie: false,
      dyzur: false,
      obslugaPoczty: false
    },
    prices: {
      oneMonth: <>70 zł / miesiąc</>,
      sixMonths: (
        <>
          390 zł <br /> (65 zł / miesiąc)
        </>
      ),
      year: (
        <>
          720 zł <br /> (60 zł / miesiąc)
        </>
      )
    },
    additionalFacilities: {
      odebranaKorespondencja: true,
      obslugaPoczty: '5 zł + opłata pocztowa / kurierska',
      fakturowanie: '20 zł do 15 dokumentów + 2 zł za każdy kolejny dokument',
      salaKonferencyjna: 'zgodnie z cennikiem sali konferencyjnej',
      stanowiskoPracy: '10 zł / 1h',
      skanPDF: '0,50 zł / strona',
      przesylanieNaAdres: '10 zł + opłata pocztowa / kurierska'
    }
  },
  {
    package: 'firma',
    facilities: {
      adresKorespondencji: true,
      odbiorList: true,
      przechowywaniePrzesylek: '30 dni',
      odbiorKurier: true,
      przechowywanieKurier: '14 dni',
      adresFirmy: true,
      materialyReklamowe: true,
      odebranaKorespondencja: true,
      salaKonferencyjna: '4h / miesiąc',
      skanowanie: '100 stron / miesiąc',
      dyzur: false,
      obslugaPoczty: true
    },
    prices: {
      oneMonth: <>110 zł / miesiąc</>,
      sixMonths: (
        <>
          630 zł <br /> (105 zł / miesiąc)
        </>
      ),
      year: (
        <>
          1200 zł <br /> (100 zł / miesiąc)
        </>
      )
    },
    additionalFacilities: {
      odebranaKorespondencja: true,
      obslugaPoczty: '5 zł + opłata pocztowa / kurierska',
      fakturowanie: '20 zł do 15 dokumentów + 2 zł za każdy kolejny dokument',
      salaKonferencyjna: 'zgodnie z cennikiem sali konferencyjnej',
      stanowiskoPracy: '10 zł / 1h',
      skanPDF: '0,50 zł / strona',
      przesylanieNaAdres: '10 zł + opłata pocztowa / kurierska'
    }
  },
  {
    package: 'firmaPlus',
    facilities: {
      adresKorespondencji: true,
      odbiorList: true,
      przechowywaniePrzesylek: '30 dni',
      odbiorKurier: true,
      przechowywanieKurier: '14 dni',
      adresFirmy: true,
      materialyReklamowe: true,
      odebranaKorespondencja: true,
      salaKonferencyjna: '6h / miesiąc',
      skanowanie: '150 stron / miesiąc',
      dyzur: true,
      obslugaPoczty: true
    },
    prices: {
      oneMonth: <>150 zł / miesiąc</>,
      sixMonths: (
        <>
          750 zł <br /> (145 zł / miesiąc)
        </>
      ),
      year: (
        <>
          1680 zł <br /> (140 zł / miesiąc)
        </>
      )
    },
    additionalFacilities: {
      odebranaKorespondencja: true,
      obslugaPoczty: true,
      fakturowanie: '20 zł do 15 dokumentów + 2 zł za każdy kolejny dokument',
      salaKonferencyjna: 'zgodnie z cennikiem sali konferencyjnej',
      stanowiskoPracy: '10 zł / 1h',
      skanPDF: '0,50 zł / strona',
      przesylanieNaAdres: '10 zł + opłata pocztowa / kurierska'
    }
  }
];

interface ITableRows {
  name: string;
  label: keyof IFacilities | keyof IPrices | keyof IAdditionalFacilities;
  type: string;
}

export const tableRows: ITableRows[] = [
  {
    name: 'Adres do korespondencji',
    label: 'adresKorespondencji',
    type: 'facilities'
  },
  {
    name: 'Odbiór przesyłek listowych',
    label: 'odbiorList',
    type: 'facilities'
  },
  {
    name: 'Przechowywanie przesyłek listowych',
    label: 'przechowywaniePrzesylek',
    type: 'facilities'
  },
  {
    name: 'Odbiór przesyłek kurierskich',
    label: 'odbiorKurier',
    type: 'facilities'
  },
  {
    name: 'Przechowywanie przesyłek kurierskich',
    label: 'przechowywanieKurier',
    type: 'facilities'
  },
  {
    name: 'Adres do rejestracji firmy',
    label: 'adresFirmy',
    type: 'facilities'
  },
  {
    name: 'Możliwość umieszczenia adresu na materiałach reklamowych',
    label: 'materialyReklamowe',
    type: 'facilities'
  },
  {
    name: 'Powiadamianie o odebranej korespondencji (e-mail)',
    label: 'odebranaKorespondencja',
    type: 'facilities'
  },
  {
    name: 'Dostęp do sali konferencyjnej / pokoju spotkań biznesowych, stanowiska pracy wraz z miejscem parkingowym',
    label: 'salaKonferencyjna',
    type: 'facilities'
  },
  {
    name: 'Skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres e-mail',
    label: 'skanowanie',
    type: 'facilities'
  },
  {
    name: 'Dyżur telefoniczny do godz. 20:00',
    label: 'dyzur',
    type: 'facilities'
  },
  {
    name: 'Obsługa poczty wychodzącej',
    label: 'obslugaPoczty',
    type: 'facilities'
  },
  {
    name: 'Płatność za 1 miesiąc z góry',
    label: 'oneMonth',
    type: 'prices'
  },
  {
    name: 'Płatność za 6 miesięcy z góry',
    label: 'sixMonths',
    type: 'prices'
  },
  {
    name: 'Płatność za 12 miesięcy z góry',
    label: 'year',
    type: 'prices'
  },
  {
    name: 'Powiadamianie o odebranej korespondencji (e-mail)',
    label: 'odebranaKorespondencja',
    type: 'additionalFacilities'
  },
  {
    name: 'Obsługa poczty wychodzącej',
    label: 'obslugaPoczty',
    type: 'additionalFacilities'
  },
  {
    name: 'Fakturowanie',
    label: 'fakturowanie',
    type: 'additionalFacilities'
  },
  {
    name: 'Dostęp do sali konferencyjnej / pokoju spotkań biznesowych wraz z miejscem parkingowym',
    label: 'salaKonferencyjna',
    type: 'additionalFacilities'
  },
  {
    name: 'Dostęp do stanowiska pracy wraz z miejscem parkingowym',
    label: 'stanowiskoPracy',
    type: 'additionalFacilities'
  },
  {
    name: 'Skanowanie korespondencji i przesyłanie w formacie pdf na wskazany adres e-mail',
    label: 'skanPDF',
    type: 'additionalFacilities'
  },
  {
    name: 'Przesyłanie odebranej korespondencji na wskazany adres w Polsce (raz w miesiącu)',
    label: 'przesylanieNaAdres',
    type: 'additionalFacilities'
  }
];
