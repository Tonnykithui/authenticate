export class CreateProductDto {
  constructor(
    public Name: string,
    public Manufacturer: string,
    public Cost: number,
    public YearOfManufacture: Date,
    public Description: string,
  ) {}
}
