export class Transaction {
  private _hash: String;
  private _block: number;
  private _from: String;
  private _to: String;
  private _amount: number;
  private _time: Date;

  constructor(hash: String, block: number, from: String, to: String, amount: number, time: Date) {
    this._hash = hash;
    this._block = block;
    this._from = from;
    this._to = to;
    this._amount = amount;
    this._time = time;
  }

  get hash(): String {
    return this._hash;
  }

  get block(): number {
    return this._block;
  }

  get from(): String {
    return this._from;
  }

  get to(): String {
    return this._to;
  }

  get amount(): number {
    return this._amount;
  }

  get time(): Date {
    return this._time;
  }
}
