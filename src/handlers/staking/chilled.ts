import * as events from "../../types/events"

import { StakingData, StakingEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleStakingEvent } from "./baseHandler"

function getChilledEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingChilledEvent(ctx)

    let account = event.asLatest
    return new StakingData({
        account: encodeID(account),
    })
}


export async function handleChilledEvent(ctx: EventHandlerContext) {
    await handleStakingEvent(ctx, StakingEventType.Chilled, getChilledEvent)
}