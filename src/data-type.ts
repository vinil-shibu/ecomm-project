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
    name:string,
    price:number,
    category:string,
    description: string,
    color:string,
    image:string
}