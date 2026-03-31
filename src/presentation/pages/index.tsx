import { BrowserRouter } from "react-router-dom"
import { WaveBackgroundComponent } from "@/presentation/components/shared/WaveBackground.component"
import { AnimatedRoutes } from "@/presentation/components/shared/AnimatedRoutes.component"

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative h-screen">
        <WaveBackgroundComponent />

        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}
