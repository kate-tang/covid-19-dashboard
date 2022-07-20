type Block = 'domesticstat' | 'worldstat' | 'graph' | 'map'

type FetchSuccess = {
  success: true;
  results: unknown;
}
type FetchFail = {
  success: false;
  message: string;
}
type Fetch = FetchSuccess | FetchFail

export { Block, Fetch }