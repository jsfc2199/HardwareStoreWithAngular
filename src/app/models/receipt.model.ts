import { Provider } from "./providers.model";

export class Receipt {
  constructor(
    public id: string,
    public description:string,
    public units: number,
    public productId: string,
    public date: string,
    public provider:Provider
  ){}
}
