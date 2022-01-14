import assert from "assert"
import * as marshal from "./marshal"

export class OtherBalanceData {
  public readonly isTypeOf = 'OtherBalanceData'
  private _account!: string
  private _amount!: bigint

  constructor(props?: Partial<Omit<OtherBalanceData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._account = marshal.id.fromJSON(json.account)
      this._amount = marshal.bigint.fromJSON(json.amount)
    }
  }

  get account(): string {
    assert(this._account != null, 'uninitialized access')
    return this._account
  }

  set account(value: string) {
    this._account = value
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access')
    return this._amount
  }

  set amount(value: bigint) {
    this._amount = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      account: this.account,
      amount: marshal.bigint.toJSON(this.amount),
    }
  }
}
