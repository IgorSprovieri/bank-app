import type { TransferEntity } from "@/domain/entities/TransferEntity"
import { Badge } from "@/presentation/components/ui/badge"
import { TransferCardComponent } from "@/presentation/components/shared/TransferCard.component"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card"

type TransferViewProps = {
  transfers: TransferEntity[]
}

export const TransfersView = ({ transfers }: TransferViewProps) => {
  return (
    <Card className="flex h-full min-h-0 w-full flex-1 flex-col gap-0 border-none bg-white py-0 text-slate-800">
      <CardHeader className="flex shrink-0 items-center justify-between px-4 pt-3 lg:px-6 lg:pt-6">
        <CardTitle
          className="text-[22px] font-bold text-slate-800 lg:text-[32px]"
          id="transfers-card-title"
        >
          Extrato
        </CardTitle>
        <Badge
          className="bg-primary px-2 text-[12px] md:px-3 md:py-1 md:text-sm"
          id="transfers-period-badge"
        >
          Últimos 30 Dias
        </Badge>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 overflow-y-auto px-4 pt-2 pb-4 md:pt-3 lg:px-6">
        <ul
          className="m-0 list-none space-y-2 p-0"
          aria-labelledby="transfers-card-title"
          aria-describedby="transfers-period-badge"
        >
          {transfers.map((transfer) => (
            <li key={transfer.id}>
              <TransferCardComponent transfer={transfer} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
