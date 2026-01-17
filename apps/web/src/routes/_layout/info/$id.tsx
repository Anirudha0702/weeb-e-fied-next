import AnimeInfo from '@/app/(pages)/InfoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/info/$id')({
  
  component: AnimeInfo,
})
