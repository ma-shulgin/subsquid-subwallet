import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getWithdrawEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesWithdrawEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
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


export async function handleWithdrawEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Withdraw, getWithdrawEvent)
}