import { ArrowDownLeft, ArrowUpRight, Landmark } from "lucide-react"
import type { TransferEntity } from "@/domain/entities/TransferEntity"
import { formatCurrency } from "@/presentation/utils"

type TransferCardComponentProps = {
  transfer: TransferEntity
}

const formatStatementDate = (value: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value)
}

export const TransferCardComponent = ({
  transfer,
}: TransferCardComponentProps) => {
  const typeWord =
    transfer.type === "Received"
      ? "Recebido"
      : transfer.type === "Sent"
        ? "Enviado"
        : "Transferência"
  const ariaLabel = `${typeWord}: ${transfer.name}, ${formatCurrency(transfer.amount)}, ${formatStatementDate(new Date(transfer.date))}`

  return (
    <article className="flex items-start gap-3" aria-label={ariaLabel}>
      <div className="rounded-full bg-slate-100 p-3" aria-hidden>
        {transfer.type === "Received" ? (
          <ArrowDownLeft className="size-3 text-success md:size-5" />
        ) : transfer.type === "Sent" ? (
          <ArrowUpRight className="size-3 text-destructive md:size-5" />
        ) : (
          <Landmark className="size-3 md:size-5" />
        )}
      </div>

      <div className="flex w-full items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium md:text-[16px]">
            {transfer.name}
          </p>
          <p className="text-[12px] text-muted md:text-[14px]">
            {formatCurrency(transfer.amount)}
          </p>
        </div>

        <div className="w-fit shrink-0 text-right">
          <p className="text-[12px] text-muted md:text-[14px]">
            {formatStatementDate(new Date(transfer.date))}
          </p>
          <p
            className={`text-[12px] font-medium md:text-[14px] ${
              transfer.type === "Received" ? "text-success" : "text-destructive"
            }`}
          >
            {transfer.type === "Received" ? "Recebido" : "Enviado"}
          </p>
        </div>
      </div>
    </article>
  )
}
