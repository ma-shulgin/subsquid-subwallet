import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getDepositEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesDepositEvent(ctx)
    if (event.isV0) {
        let [who, amount] = event.asV0
        return { accounts: [who], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.who], amounts: [event.asLatest.amount] }
    }
}


export async function handleDepositEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Deposit, getDepositEvent)
}