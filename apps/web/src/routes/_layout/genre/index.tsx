import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/genre/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/watch/genre/"!</div>
}
