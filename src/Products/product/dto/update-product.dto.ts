export class UpdateProductDto {
  constructor(
    public Name: string,
    public Manufacturer: string,
    public Cost: number,
    public YearOfManufacture: Date,
    public Description: string,
  ) {}
}
