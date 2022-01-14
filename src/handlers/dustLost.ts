import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getDustLostEvent(ctx: EventHandlerContext): BalanceEvent {
    let event = new events.BalancesDustLostEvent(ctx)
    if (event.isV0) {
        let [account, amount] = event.asV0
        return new OtherBalanceData({
            account: encodeID(account),
            amount: amount,
        })
    } else {
        let { account, amount } = event.asLatest
        return new OtherBalanceData({
            account: encodeID(account),
            amount: amount,
        })
    }
}


export async function handleDustLostEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.DustLost, getDustLostEvent)
}