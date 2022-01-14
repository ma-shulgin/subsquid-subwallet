import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import {BalanceStatus} from "./_balanceStatus"
import {BalanceEventType} from "./_balanceEventType"

@Entity_()
export class BalanceTransaction {
  constructor(props?: Partial<BalanceTransaction>) {
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

  @Column_("bool", {nullable: false})
  success!: boolean

  @Column_("text", {array: true, nullable: true})
  accounts!: (string)[] | undefined | null

  @Column_("numeric", {array: true, nullable: true})
  amounts!: (bigint)[] | undefined | null

  @Column_("varchar", {length: 8, nullable: true})
  status!: BalanceStatus | undefined | null

  @Column_("varchar", {length: 18, nullable: true})
  event!: BalanceEventType | undefined | null
}
