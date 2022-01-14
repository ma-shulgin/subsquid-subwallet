import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {StakingData} from "./_stakingData"
import {StakingEventType} from "./_stakingEventType"

@Entity_()
export class StakingTransaction {
  constructor(props?: Partial<StakingTransaction>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("text", {nullable: false})
  blockHash!: string

  @Column_("integer", {nullable: false})
  blockNumber!: number

  @Column_("text", {nullable: true})
  extrinisicHash!: string | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new StakingData(undefined, obj)}, nullable: true})
  data!: StakingData | undefined | null

  @Column_("varchar", {length: 9, nullable: true})
  event!: StakingEventType | undefined | null
}
