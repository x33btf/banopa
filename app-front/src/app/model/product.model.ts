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

export interface User {
  user_id:string,
  user_name:string,
  user_mail:string,
  user_token:string,
  user_token_ref:string,
  user_password : string
}

export interface Token_info {
  //to verify
  token:string;
  refresh_token:string

}
