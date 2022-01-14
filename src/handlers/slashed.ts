import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getSlashedEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesSlashedEvent(ctx)
    if (event.isV9122) {
        let [who, amount] = event.asV9122
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


export async function handleSlashedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Slashed, getSlashedEvent)
}