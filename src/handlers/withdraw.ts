import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getWithdrawEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesWithdrawEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
        return { accounts: [who], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.who], amounts: [event.asLatest.amount] }
    }
}


export async function handleWithdrawEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Withdraw, getWithdrawEvent)
}