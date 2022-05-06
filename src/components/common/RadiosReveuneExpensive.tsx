import React from 'react'
import { RevenueExpenseType } from 'typings'
import Radios from './Radios'

type Item = {
  name: string
  value: RevenueExpenseType
}

type Props = {
  value: RevenueExpenseType
  onSelect: (value: RevenueExpenseType) => void
}

const data: Item[] = [
  { name: 'Khoản thu', value: 'thu' },
  { name: 'Khoản chi', value: 'chi' },
]

export default function RadiosReveuneExpensive({ value, onSelect }: Props) {
  return (
    <Radios
      data={data}
      listTitle="Loại thu chi"
      selectedValue={value}
      onSelect={item => onSelect(item.value)}
    />
  )
}
