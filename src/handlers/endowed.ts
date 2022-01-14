import * as events from "../types/events"

import { BalanceEvent, handleBalanceEvent } from "./baseBalanceHandler"
import { BalanceEventType, OtherBalanceData } from "../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../helpers/common"

function getEndowedEvent(ctx: EventHandlerContext): OtherBalanceData {
    let event = new events.BalancesEndowedEvent(ctx)
    if (event.isV0) {
        let [account, amount] = event.asV0
        return new OtherBalanceData({
            account: encodeID(account),
            amount: amount,
        })
    } else {
        let { account, freeBalance } = event.asLatest
        return new OtherBalanceData({
            account: encodeID(account),
            amount: freeBalance,
        })
    }
}


export async function handleEndowedEvent(ctx: EventHandlerContext) {
    await handleBalanceEvent(ctx, BalanceEventType.Endowed, getEndowedEvent)
}