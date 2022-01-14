import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getTransferEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesTransferEvent(ctx)
    if (event.isV0) {
        let [from, to, amount] = event.asV0
        return { accounts: [from, to], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.from, event.asLatest.to], amounts: [event.asLatest.amount] }
    }
}


export async function handleTransferEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Transfer, getTransferEvent)
}