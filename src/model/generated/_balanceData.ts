import {TransferData} from "./_transferData"
import {OtherBalanceData} from "./_otherBalanceData"
import {SetBalanceData} from "./_setBalanceData"

export type BalanceData = TransferData | OtherBalanceData | SetBalanceData

export function fromJsonBalanceData(json: any): BalanceData {
  switch(json?.isTypeOf) {
    case 'TransferData': return new TransferData(undefined, json)
    case 'OtherBalanceData': return new OtherBalanceData(undefined, json)
    case 'SetBalanceData': return new SetBalanceData(undefined, json)
    default: throw new TypeError('Unknown json object passed as BalanceData')
  }
}
