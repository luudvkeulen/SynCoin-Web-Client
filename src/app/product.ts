export class Product {
  // Fields
  id: number;
  name: String;
  description: String;
  price: number;
  image: String;

  constructor(id: number, name: String, description: String, price: number, image: String) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}
