"use client"
import React, { useState } from 'react'
 
type Props = {}

const Page = (props: Props) => {
  const faker = require('faker');

  // Generate a sample employee name
  const employeeName = faker.name.findName();
  
  console.log(employeeName);
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Hello</p>
  </div>
 
  )
}

export default Page