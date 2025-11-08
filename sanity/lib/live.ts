import 'server-only'
import { client } from '@/sanity/lib/client'

function defineLive(opts: { client: any }) {
  const sanityFetch = (query: string, params?: Record<string, any>) => {
	return opts.client.fetch(query, params)
  }

  const SanityLive = {
	// minimal no-op live helper: subscribe runs one fetch and returns an unsubscribe handle
	subscribe: (query: string, params: Record<string, any> | undefined, cb: (data: any) => void) => {
	  opts.client.fetch(query, params).then((res: any) => cb(res)).catch(() => {})
	  return { unsubscribe() {} }
	}
  }

  return { sanityFetch, SanityLive }
}

export const { sanityFetch, SanityLive } = defineLive({ client })