import { Product } from "./product.model";

export class CartItem {
  constructor(
    public id: string,
    public product: Product,
    public totalItems: number,
    public totalValue: number,
    public clientName: string,
    public sellerName: string
  ) {}
}
