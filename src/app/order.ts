import {User} from './user';

export class Order {
  protected constructor(public id: string, public created: string, public user: User, public products: any[],
    public statusUpdates: any[]) {
  }

  public static fromData(data: any): Order {
    return new Order(
      data.id,
      data.created,
      data.user,
      data.products,
      data.statusUpdates
    );
  }

  public isFunded(): boolean {
    return this.statusUpdates.some((statusUpdate) => statusUpdate.status === 'created');
  }

  public isDelivering(): boolean {
    return this.statusUpdates.some((statusUpdate) => statusUpdate.status === 'delivering');
  }

  public isReceived(): boolean {
    return this.statusUpdates.some((statusUpdate) => statusUpdate.status === 'received');
  }

  public isCanceled(): boolean {
    return this.statusUpdates.some((statusUpdate) => statusUpdate.status === 'canceled');
  }

  public canDeliver(): boolean {
    return this.isFunded() && !this.isCanceled() && !this.isDelivering();
  }

  public canReceive(): boolean {
    return this.isDelivering() && !this.isCanceled() && !this.isReceived();
  }

  public canCancel(): boolean {
    return this.isFunded() && !this.isReceived();
  }

  public getLastStatus(): string {
    if (!this.statusUpdates.length) {
      return '-';
    }

    const status = this.statusUpdates[this.statusUpdates.length - 1].status;
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  public getTotalPrice(): Number {
    return this.products.reduce((price, product) => Number(price) + Number(product.price), 0);
  }

  public getPaidPrice(): Number {
    return this.statusUpdates
      .filter((statusUpdate) => statusUpdate.status === 'created')
      .reduce((amount, statusUpdate) => Number(amount) + Number(statusUpdate.amount), 0);
  }

  public getProductsAsString(): string {
    return this.products.map((product) => product.name).join(', ');
  }
}
