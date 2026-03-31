import { cloneElement, isValidElement, useMemo, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation, useRoutes, type RouteObject } from "react-router-dom"
import { HomePage } from "@/presentation/pages/Home"
import { LoginPage } from "@/presentation/pages/Login"
import { CreateTransferPage } from "@/presentation/pages/createTransfer"
import { ProtectedRoute } from "@/presentation/components/shared/ProtectedRoute.component"

const fadeTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
}

function fadePage(content: ReactNode) {
  return (
    <motion.div
      className="flex min-h-0 w-full flex-1 flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fadeTransition}
    >
      {content}
    </motion.div>
  )
}

export function AnimatedRoutes() {
  const location = useLocation()

  const routeObjects = useMemo<RouteObject[]>(
    () => [
      {
        path: "/login",
        element: fadePage(<LoginPage />),
      },
      {
        path: "/criar-transferencia",
        element: fadePage(
          <ProtectedRoute>
            <CreateTransferPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: fadePage(
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
    []
  )

  const element = useRoutes(routeObjects, location)

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <AnimatePresence mode="wait">
        {isValidElement(element)
          ? cloneElement(element, { key: location.pathname })
          : element}
      </AnimatePresence>
    </div>
  )
}
