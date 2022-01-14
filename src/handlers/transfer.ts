import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, TransferData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getTransferEvent(ctx: EventHandlerContext): TransferData {
    let event = new events.BalancesTransferEvent(ctx)
    if (event.isV0) {
        let [from, to, amount] = event.asV0
        return new TransferData({
            from: encodeID(from),
            to: encodeID(to),
            amount: amount
        })
    } else {
        let { from, to, amount } = event.asLatest
        return new TransferData({
            from: encodeID(from),
            to: encodeID(to),
            amount: amount
        })
    }
}


export async function handleTransferEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Transfer, getTransferEvent)
}