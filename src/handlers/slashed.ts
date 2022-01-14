import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"

import { BalanceEventType } from "../model"
import { EventHandlerContext } from "@subsquid/substrate-processor"

function getSlashedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesSlashedEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
        return { accounts: [who], amounts: [amount] }
    } else {
        return { accounts: [event.asLatest.who], amounts: [event.asLatest.amount] }
    }
}


export async function handleSlashedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Slashed, getSlashedEvent)
}