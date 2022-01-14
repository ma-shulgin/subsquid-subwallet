import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getUnreservedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesUnreservedEvent(ctx)
    if (event.isV8) {
        let [who, amount] = event.asV8
        return new OtherBalanceData({
            account: encodeID(who),
            amount: amount,
        })
    } else {
        let { who, amount } = event.asLatest
        return new OtherBalanceData({
            account: encodeID(who),
            amount: amount,
        })
    }
}

export async function handleUnreservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Unreserved, getUnreservedEvent)
}