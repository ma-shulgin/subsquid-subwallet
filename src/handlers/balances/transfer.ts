import * as events from "../../types/events"

import { BalanceData, BalanceEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleBalanceEvent } from "./baseHandler"

function getTransferEvent(ctx: EventHandlerContext): BalanceData {
    let event = new events.BalancesTransferEvent(ctx)
    if (event.isV0) {
        let [from, to, amount] = event.asV0
        return new BalanceData({
            from: encodeID(from),
            to: encodeID(to),
            amount: amount
        })
    } else {
        let { from, to, amount } = event.asLatest
        return new BalanceData({
            from: encodeID(from),
            to: encodeID(to),
            amount: amount
        })
    }
}


export async function handleTransferEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Transfer, getTransferEvent)
}