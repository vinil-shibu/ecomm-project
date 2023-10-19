export interface SignUp{
    name:string,
    password:string,
    email:string
}
export interface Login{
    email:string,
    password:string
}

export interface product{
    quantity:undefined | number
    name:string,
    price:number,
    category:string,
    description: string,
    color:string,
    image:string,
    id:number
}

export interface cart{
    quantity:undefined | number
    name:string,
    price:number,
    category:string,
    description: string,
    color:string,
    image:string,
    id:number | undefined,
    userId:number,
    productId:number
}