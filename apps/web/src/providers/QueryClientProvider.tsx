import {
  QueryClient,
  QueryClientProvider as RQProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
      <ReactQueryDevtools initialIsOpen={false} />
    </RQProvider>
  );
}

export default QueryClientProvider;
