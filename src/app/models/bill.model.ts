import { Product } from "./product.model";

export class Bill {
  constructor(
    public clientName: string,
    public seller: string,
    public date: string,
    public productsBought: Product[],
    public totalPaid: number
    ){}
}
