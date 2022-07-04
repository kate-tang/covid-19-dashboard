// api path: https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=4001&limited=TWN
interface Domestic {
  id: string;
  a01: string;
  a02: string;
  a03: string;
  a04: string;
  a05: string;
  a06: string;
  a07: string;
  a08: string;
  a09: string;
  a10: string;
  a11: string;
  a12: string;
  a13: string;
  a14: string;
  a15: string;
  a16: string;
  a17: string;
  a18: string;
  a19: string;
  a20: string;
  a21: string;
  a22: string;
  a23: string;
  a24: string;
  a25: string;
  a26: string;
  a27: string;
  a28: string;
  a29: string;
  a30: string;
  a31: string;
  a32: string;
}

// api path: https://api.covid19api.com/summary
interface World {
  Countries: Country[];
  Date: string;
  Global: Global;
  ID: string;
  Message: string;
}
interface Country {
  Country: string;
  CountryCode: string;
  Date: string;
  ID: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: object;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}
interface Global {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export { Domestic, World, Country, Global }