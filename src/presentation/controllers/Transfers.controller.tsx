import { transferService } from "@/domain/services/transfer.service"
import { TransfersView } from "@/presentation/components/views/Transfers.view"
import { useQuery } from "@tanstack/react-query"

export const TransfersController = () => {
  const { data: transfers } = useQuery({
    queryKey: ["transfers"],
    queryFn: transferService.getTransfers,
  })

  return <TransfersView transfers={transfers ?? []} />
}
