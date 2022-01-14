import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, BalanceStatus } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"

function getReserveRepatriatedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesReserveRepatriatedEvent(ctx)
    if (event.isV8) {
        let [from, to,  amount, status] = event.asV8
        return { accounts: [from, to], amounts: [amount], status: String(status) === String(BalanceStatus.Free) ? BalanceStatus.Free : BalanceStatus.Reserved }
    } else {
        return { accounts: [event.asLatest.from, event.asLatest.to], amounts: [event.asLatest.amount],  status: String(event.asLatest.destinationStatus) === String(BalanceStatus.Free) ? BalanceStatus.Free : BalanceStatus.Reserved}
    }
}

export async function handleReserveRepatriatedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.ReserveRepatriated, getReserveRepatriatedEvent)
}