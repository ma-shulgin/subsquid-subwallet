import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getReservedEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesReservedEvent(ctx)
    if (event.isV8) {
        let [who, amount] = event.asV8
        return new BalanceData({
            account: encodeID(who),
            amount: amount,
        })
    } else {
        let { who, amount } = event.asLatest
        return new BalanceData({
            account: encodeID(who),
            amount: amount,
        })
    }
}


export async function handleReservedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Reserved, getReservedEvent)
}