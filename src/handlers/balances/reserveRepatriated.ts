import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getReserveRepatriatedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesReserveRepatriatedEvent(ctx)
    if (event.isV8) {
        let [from, to, amount, status] = event.asV8
        return new BalanceData({
            from: encodeID(from),
            to: encodeID(to),
            amount: amount,
            status: String(status)
        })
    } else {
        return new BalanceData({
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