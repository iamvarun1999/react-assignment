import { CartPayload, LoginPayload, Product } from '../Modals/Modals'
import axiosIntercepter from './intercepter'

export class ApisRoutes{
     public static async getProductById(id:string){
       return await axiosIntercepter.get<Product>(`products/${id}`)
     }

     public static async loginAdmin(payload:LoginPayload){
       return await axiosIntercepter.post(`auth/login`,payload)
     }

     public static async addProduct(payload:Product){
       return await axiosIntercepter.post(`products`,payload)
     }

     public static async updateProduct(id:number,payload:Product){
       return await axiosIntercepter.put(`products/${id}`,payload)
     }

     public static async deleteProduct(id:number){
       return await axiosIntercepter.delete(`products/${id}`)
     }

     public static async addToCart(payload:CartPayload){
       return await axiosIntercepter.put(`carts/2`,payload)
     }

     public static async getUserCart(){
       return await axiosIntercepter.get(`carts/user/2`)
     }
}