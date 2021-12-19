export  interface Product {
  _id : string,
  restaurant_name: string,
  cuisine: string,
  borough: string,
  address: {
    building: string,
    street: string,
    postcode: string
  }
}

export interface resProduct{
  status: string,
  res: Product[]
}
