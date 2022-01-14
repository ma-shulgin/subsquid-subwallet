import assert from "assert"
import * as marshal from "./marshal"

export class SetBalanceData {
  public readonly isTypeOf = 'SetBalanceData'
  private _who!: string
  private _free!: bigint
  private _reserved!: bigint

  constructor(props?: Partial<Omit<SetBalanceData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._who = marshal.id.fromJSON(json.who)
      this._free = marshal.bigint.fromJSON(json.free)
      this._reserved = marshal.bigint.fromJSON(json.reserved)
    }
  }

  get who(): string {
    assert(this._who != null, 'uninitialized access')
    return this._who
  }

  set who(value: string) {
    this._who = value
  }

  get free(): bigint {
    assert(this._free != null, 'uninitialized access')
    return this._free
  }

  set free(value: bigint) {
    this._free = value
  }

  get reserved(): bigint {
    assert(this._reserved != null, 'uninitialized access')
    return this._reserved
  }

  set reserved(value: bigint) {
    this._reserved = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      who: this.who,
      free: marshal.bigint.toJSON(this.free),
      reserved: marshal.bigint.toJSON(this.reserved),
    }
  }
}
