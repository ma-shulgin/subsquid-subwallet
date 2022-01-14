import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getUnreservedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesUnreservedEvent(ctx)
    if (event.isV8) {
        let [account, amount] = event.asV8
        return { accounts: [account], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.who], amounts: [event.asLatest.amount] }
    }
}


export async function handleUnreservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Unreserved, getUnreservedEvent)
}