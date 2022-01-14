import assert from "assert"
import * as marshal from "./marshal"

export class BalanceData {
  private _from!: string | undefined | null
  private _to!: string | undefined | null
  private _account!: string | undefined | null
  private _amount!: bigint | undefined | null
  private _status!: string | undefined | null
  private _free!: bigint | undefined | null
  private _reserved!: bigint | undefined | null

  constructor(props?: Partial<Omit<BalanceData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._from = json.from == null ? undefined : marshal.id.fromJSON(json.from)
      this._to = json.to == null ? undefined : marshal.id.fromJSON(json.to)
      this._account = json.account == null ? undefined : marshal.id.fromJSON(json.account)
      this._amount = json.amount == null ? undefined : marshal.bigint.fromJSON(json.amount)
      this._status = json.status == null ? undefined : marshal.string.fromJSON(json.status)
      this._free = json.free == null ? undefined : marshal.bigint.fromJSON(json.free)
      this._reserved = json.reserved == null ? undefined : marshal.bigint.fromJSON(json.reserved)
    }
  }

  get from(): string | undefined | null {
    return this._from
  }

  set from(value: string | undefined | null) {
    this._from = value
  }

  get to(): string | undefined | null {
    return this._to
  }

  set to(value: string | undefined | null) {
    this._to = value
  }

  get account(): string | undefined | null {
    return this._account
  }

  set account(value: string | undefined | null) {
    this._account = value
  }

  get amount(): bigint | undefined | null {
    return this._amount
  }

  set amount(value: bigint | undefined | null) {
    this._amount = value
  }

  get status(): string | undefined | null {
    return this._status
  }

  set status(value: string | undefined | null) {
    this._status = value
  }

  get free(): bigint | undefined | null {
    return this._free
  }

  set free(value: bigint | undefined | null) {
    this._free = value
  }

  get reserved(): bigint | undefined | null {
    return this._reserved
  }

  set reserved(value: bigint | undefined | null) {
    this._reserved = value
  }

  toJSON(): object {
    return {
      from: this.from,
      to: this.to,
      account: this.account,
      amount: this.amount == null ? undefined : marshal.bigint.toJSON(this.amount),
      status: this.status,
      free: this.free == null ? undefined : marshal.bigint.toJSON(this.free),
      reserved: this.reserved == null ? undefined : marshal.bigint.toJSON(this.reserved),
    }
  }
}
