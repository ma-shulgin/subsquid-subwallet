import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getBalanceSetEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesBalanceSetEvent(ctx)
    if (event.isV0) {
        let [account, free, res] = event.asV0
        return { accounts: [account], amounts: [free, res] }
    } else {
        return { accounts: [event.asLatest.who], amounts: [event.asLatest.free, event.asLatest.reserved] }
    }
}


export async function handleBalanceSetEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.BalanceSet, getBalanceSetEvent)
}