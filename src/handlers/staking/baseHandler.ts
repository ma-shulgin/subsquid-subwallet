import { StakingData, StakingEventType, StakingTransaction } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"

export async function handleStakingEvent(ctx: EventHandlerContext,
    eventType: StakingEventType,
    getter: (ctx: EventHandlerContext) => StakingData) {
    let data = getter(ctx)

    let transaction = new StakingTransaction({
        id: ctx.event.id,
        blockHash: ctx.block.hash,
        blockNumber: ctx.event.blockNumber,
        extrinisicHash: ctx.extrinsic?.hash,
        date: new Date(ctx.block.timestamp),
    })
    transaction.data = data
    transaction.event = eventType
    await ctx.store.save(transaction)
}