import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getDepositEvent(ctx: EventHandlerContext): OtherBalanceData {
    let event = new events.BalancesDepositEvent(ctx)
    if (event.isV0) {
        let [who, amount] = event.asV0
        return new OtherBalanceData({
            account: encodeID(who),
            amount: amount,
        })
    } else {
        let { who, amount } = event.asLatest
        return new OtherBalanceData({
            account: encodeID(who),
            amount: amount,
        })
    }
}


export async function handleDepositEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Deposit, getDepositEvent)
}