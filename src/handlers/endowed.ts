import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getEndowedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesEndowedEvent(ctx)
    if (event.isV0) {
        let [account, freeBalance] = event.asV0
        return { accounts: [account], amounts: [freeBalance] }
    } else {
        return { accounts: [event.asLatest.account], amounts: [event.asLatest.freeBalance] }
    }
}


export async function handleEndowedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Endowed, getEndowedEvent)
}