import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getWithdrawEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesWithdrawEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
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


export async function handleWithdrawEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Withdraw, getWithdrawEvent)
}