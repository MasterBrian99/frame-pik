import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(authenticated)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated)/"!</div>
}
