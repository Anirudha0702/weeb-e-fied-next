import { ChevronRight, Home } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  maxWidth?: string // optional per-item width
}

function Breadcrumb({ items, maxWidth = 'max-w-[160px]' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-600">
      <ol className="flex items-center gap-1 min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-1 min-w-0">
              {index !== 0 && (
                <ChevronRight className="h-4 w-4 shrink-0 text-secondary" />
              )}

              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={`hover:text-primary transition-colors truncate ${maxWidth}`}
                  title={item.label}
                >
                  {index === 0 ? (
                    <span className="flex items-center gap-1 truncate">
                      <Home className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </a>
              ) : (
                <span
                  className={`font-medium text-primary truncate ${maxWidth}`}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
