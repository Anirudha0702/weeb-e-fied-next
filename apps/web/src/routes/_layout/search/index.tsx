import SearchPage from '@/app/(pages)/SearchPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/search/')({
  validateSearch: (search) => ({
    query: typeof search.query === "string" ? search.query : "",
    
  }),
  component: SearchPage,
})

