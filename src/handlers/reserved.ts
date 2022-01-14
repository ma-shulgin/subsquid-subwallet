import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getReservedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesReservedEvent(ctx)
    if (event.isV8) {
        let [account, amount] = event.asV8
        return { accounts: [account], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.who], amounts: [event.asLatest.amount] }
    }
}


export async function handleReservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Reserved, getReservedEvent)
}