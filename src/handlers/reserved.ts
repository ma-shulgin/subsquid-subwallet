import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getReservedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesReservedEvent(ctx)
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


export async function handleReservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Reserved, getReservedEvent)
}