import React from 'react'

import { getcategories } from '@/app/actions/categories.action'
import CategoriesSilder from './CategoriesSilder'

export default async function Catsilder() {
    const response = await getcategories()
    console.log(response?.data)
  return (
    <>
        <CategoriesSilder categories={response?.data}/>
    </>
  )
}
