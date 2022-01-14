import assert from "assert"
import * as marshal from "./marshal"

export class StakingData {
  private _account!: string
  private _amount!: bigint | undefined | null

  constructor(props?: Partial<Omit<StakingData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._account = marshal.id.fromJSON(json.account)
      this._amount = json.amount == null ? undefined : marshal.bigint.fromJSON(json.amount)
    }
  }

  get account(): string {
    assert(this._account != null, 'uninitialized access')
    return this._account
  }

  set account(value: string) {
    this._account = value
  }

  get amount(): bigint | undefined | null {
    return this._amount
  }

  set amount(value: bigint | undefined | null) {
    this._amount = value
  }

  toJSON(): object {
    return {
      account: this.account,
      amount: this.amount == null ? undefined : marshal.bigint.toJSON(this.amount),
    }
  }
}
