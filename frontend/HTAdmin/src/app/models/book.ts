import { Category } from './category';
import { SubCategory } from './sub-category';

export class Book {
  public id: number;
  public title: string;
  public author: string;
  public publisher: string;
  public publicationDate: string;
  public description: string;
  public cover: string;
  public agency: string;
  public imageUrl: string;
  public listPrice: number;
  public discountRate: number;
  public pages: number;
  public size: string;
  public sku: string;
  public quantityInStock: number;
  public active: boolean;
  public subCategory: SubCategory;
}