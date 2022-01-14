import assert from "assert"
import * as marshal from "./marshal"

export class TransferData {
  public readonly isTypeOf = 'TransferData'
  private _from!: string
  private _to!: string
  private _amount!: bigint
  private _status!: string | undefined | null

  constructor(props?: Partial<Omit<TransferData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._from = marshal.id.fromJSON(json.from)
      this._to = marshal.id.fromJSON(json.to)
      this._amount = marshal.bigint.fromJSON(json.amount)
      this._status = json.status == null ? undefined : marshal.string.fromJSON(json.status)
    }
  }

  get from(): string {
    assert(this._from != null, 'uninitialized access')
    return this._from
  }

  set from(value: string) {
    this._from = value
  }

  get to(): string {
    assert(this._to != null, 'uninitialized access')
    return this._to
  }

  set to(value: string) {
    this._to = value
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access')
    return this._amount
  }

  set amount(value: bigint) {
    this._amount = value
  }

  get status(): string | undefined | null {
    return this._status
  }

  set status(value: string | undefined | null) {
    this._status = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      from: this.from,
      to: this.to,
      amount: marshal.bigint.toJSON(this.amount),
      status: this.status,
    }
  }
}
