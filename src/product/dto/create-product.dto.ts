import { IsNotEmpty, IsNumber, Min, min } from "class-validator";

export class CreateProductDto {

  id: number;
  @IsNotEmpty()
  Nombre: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(10000, {message: 'El valor debe ser mayor a $10000'})
  Precio: number;

}
