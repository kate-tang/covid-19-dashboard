type data = {
  id: number;
  label: string;
  value: number;
}

const case_by_gender: data[] = [
  { id: 1, label: '男', value: 47.6 },
  { id: 2, label: '女', value: 52.4 }
]

const death_by_gender: data[] = [
  { id: 1, label: '男', value: 58.2 },
  { id: 2, label: '女', value: 41.8 }
]

const case_by_age: data[] = [
  { id: 1, label: '<10', value: 10.6 },
  { id: 2, label: '10-20', value: 9 },
  { id: 3, label: '20-30', value: 16.7 },
  { id: 4, label: '30-40', value: 18.3 },
  { id: 5, label: '40-50', value: 16.7 },
  { id: 6, label: '50-60', value: 11.8 },
  { id: 7, label: '60-70', value: 9.7 },
  { id: 8, label: '>70', value: 7.2 }
]

const death_by_age: data[] = [
  { id: 1, label: '<17', value: 0.5 },
  { id: 2, label: '18-29', value: 0.2 },
  { id: 3, label: '30-49', value: 3.1 },
  { id: 4, label: '50-64', value: 19.9 },
  { id: 5, label: '65-74', value: 23 },
  { id: 6, label: '>75', value: 53.3 }
]

export default {
  case_by_gender, death_by_gender,
  case_by_age, death_by_age
}