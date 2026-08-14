export interface City {
  name: string
  code: string
  airport: string
  lat: number
  lon: number
}

export interface FlightLeg {
  id: string
  from: City
  to: City
  date: string
  year: number
}

// Real airport coordinates
const SAO_PAULO: City = { name: "São Paulo", code: "GRU", airport: "Guarulhos", lat: -23.4356, lon: -46.4731 }
const BUENOS_AIRES: City = { name: "Buenos Aires", code: "EZE", airport: "Ministro Pistarini", lat: -34.8222, lon: -58.5358 }
const ATLANTA: City = { name: "Atlanta", code: "ATL", airport: "Hartsfield–Jackson", lat: 33.6407, lon: -84.4277 }
const TORONTO: City = { name: "Toronto", code: "YYZ", airport: "Pearson", lat: 43.6777, lon: -79.6248 }
const DALLAS: City = { name: "Dallas", code: "DFW", airport: "Dallas/Fort Worth", lat: 32.8998, lon: -97.0403 }

export const flights: FlightLeg[] = [
  { id: "gru-eze-2010", from: SAO_PAULO, to: BUENOS_AIRES, date: "2010", year: 2010 },
  { id: "gru-atl-2018", from: SAO_PAULO, to: ATLANTA, date: "Jul 2018", year: 2018 },
  { id: "atl-yyz-2018", from: ATLANTA, to: TORONTO, date: "Jul 2018", year: 2018 },
  { id: "yyz-atl-2018", from: TORONTO, to: ATLANTA, date: "Aug 2018", year: 2018 },
  { id: "atl-gru-2018", from: ATLANTA, to: SAO_PAULO, date: "Aug 2018", year: 2018 },
  { id: "gru-dfw-2025", from: SAO_PAULO, to: DALLAS, date: "Feb 2025", year: 2025 },
  { id: "dfw-atl-2025", from: DALLAS, to: ATLANTA, date: "Jul 2025", year: 2025 },
  { id: "atl-gru-2025", from: ATLANTA, to: SAO_PAULO, date: "Jul 2025", year: 2025 },
]

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

/** Great-circle distance between two airports, in km. */
export function distanceKm(a: City, b: City): number {
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(h)))
}

/** Rough flight-time estimate from distance (cruise speed + taxi/climb/descent overhead). Not a real logged time. */
export function estimateDuration(km: number): string {
  const hours = km / 850 + 0.5
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m}m`
}
