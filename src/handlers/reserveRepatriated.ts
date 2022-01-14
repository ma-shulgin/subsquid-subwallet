import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, TransferData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getReserveRepatriatedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesReserveRepatriatedEvent(ctx)
    if (event.isV8) {
        let [from, to, amount, status] = event.asV8
        return new TransferData({
            from: encodeID(from),
            to: encodeID(to),
            amount: amount,
            status: String(status)
        })
    } else {
        return new TransferData({
            from: encodeID(event.asLatest.from),
            to: encodeID(event.asLatest.to),
            amount: event.asLatest.amount,
            status: String(event.asLatest.destinationStatus)
        })
    }
}

export async function handleReserveRepatriatedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.ReserveRepatriated, getReserveRepatriatedEvent)
}