import { Provider } from "./providers.model"

export class Product{
  constructor(
    public id: string,
    public minUnits: number,
    public maxUnits: number,
    public productName: string,
    public description: string,
    public unitsAvailable: number,
    public price: number,
    public provider: Provider){}
}

