export  interface Product {
  restaurant_id : number,
  restaurant_name: string,
  cuisine: string,
  borough: string,
  address: {
    building: string,
    street: string,
    postcode: string
  }
}
