
import {
  QueryClient,
  QueryClientProvider as RQProvider,
} from '@tanstack/react-query'
interface IQueryClientProvider {
  children: React.ReactNode;
}
function QueryClientProvider({ children }: IQueryClientProvider) {
  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
}); 
  return (
    <RQProvider client={queryClient}>
      {children}
    </RQProvider>
  )
}

export default QueryClientProvider
  