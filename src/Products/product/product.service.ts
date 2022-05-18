import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDet } from './entities/product.entity';
import { Product, ProductDocument } from './product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<ProductDet[]> {
    return this.productModel.find();
  }

  async findOne(id: string) {
    const reqProduct = this.productModel.find({ _id: id });
    if (reqProduct == null) {
      throw new NotFoundException('Product not found');
    }
    return reqProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productExists = await this.productModel.find({ _id: id });
    if (productExists == null) {
      throw new NotFoundException('Product does not exists');
    }
    const upd = await this.productModel
      .findByIdAndUpdate(id, updateProductDto)
      .setOptions({ overwrite: true, new: true })
      .populate('Name')
      .populate('Manufacturer')
      .populate('Cost')
      .populate('YearOfManufacture')
      .populate('Description');
    return upd;
  }

  async remove(id: string): Promise<string> {
    const itemToDel = this.productModel.find({ _id: id });
    if (itemToDel == null) {
      throw new NotFoundException('Item does not exists');
    }
    (await this.productModel.findByIdAndDelete({ _id: id })).save();
    return 'Deleted';
  }
}
