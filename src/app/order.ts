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
    return this.isFunded();
  }
}
