import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getDepositEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesDepositEvent(ctx)
    if (event.isV0) {
        let [who, amount] = event.asV0
        return new BalanceData({
            account: encodeID(who),
            amount: amount,
        })
    } else {
        let { who, amount } = event.asLatest
        return new BalanceData({
            account: encodeID(who),
            amount: amount,
        })
    }
}


export async function handleDepositEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Deposit, getDepositEvent)
}