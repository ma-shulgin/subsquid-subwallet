import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getDustLostEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesDustLostEvent(ctx)
    if (event.isV0) {
        let [account, amount] = event.asV0
        return { accounts: [account], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.account], amounts: [event.asLatest.amount] }
    }
}


export async function handleDustLostEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.DustLost, getDustLostEvent)
}