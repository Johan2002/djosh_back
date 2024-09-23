import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return { message: 'Producto creado exitosamente.' }
  }

  async findAll(): Promise<Product[]> {
    const list = await this.productRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista de productos vacía.' });
    }
    return list;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({id : id});
    if (!product){
      throw new NotFoundException({ message: 'No existe este producto.' });
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({where : {id}});
    if (product){
      const productActualizado = {
        ...product,
        ...updateProductDto
      };
      await this.productRepository.save(productActualizado);
      return { message: 'Producto actualizado exitosamente.' };
    }else{
      throw new NotFoundException({ message: 'No existe este producto.' });
    }
  }

  async remove(id: number): Promise<any> {
    await this.productRepository.softDelete(+id);
    return { message: 'Producto eliminado exitosamente.' };
  }
}
