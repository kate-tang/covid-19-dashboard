// js async fetch
const fetchData = async (path: string): Promise<[undefined, unknown] | [unknown, undefined]> => {
  try {
    const res = await fetch(path)
    const data = await res.json()
    return [undefined, data]
  } catch (err) {
    return [err, undefined]
  }
}

// round to x decimal places
// 123.456 -> 123.46
// '123.456' -> '123.46'
function round(num: string, place: number): string;
function round(num: number, place: number): number;
function round(num: unknown, place: number): unknown {
  const n = num as number | string
  
  if (typeof n === 'string'){
    return parseFloat(n).toFixed(place)
  } else {
    return parseFloat(n.toFixed(place))
  }
}

// format number with commas
// 31256 -> '31,256'
// '31256' -> '31,256'
function format(num: string): string;
function format(num: number): number;
function format(num: unknown): unknown {
  const n = num as number | string
  const regex = /\B(?=(\d{3})+(?!\d))/g

  if (typeof n === 'string'){
    return n.replace(regex, ',')
  } else {
    return n.toString().replace(regex, ',')
  }
}

export { fetchData, round, format }