// @flow
import type { OrderBookState } from '../../types/orderBook'
import SortedArray from 'sorted-array'

const initialState: OrderBookState = {
  selected: null,
  bids: {},
  asks: {},
  sortedBids: [],
  sortedAsks: [],
  quoteToken: '',
  baseToken: '',
}

export const initialized = () => {
  const event = (state: OrderBookState = initialState) => state
  return event
}

export const selected = (order: Object) => {
  const event = (state: OrderBookState) => ({
    ...state,
    selected: order,
  })

  return event;
}

export const orderBookInitialized = (bids: Array<Object>, asks: Array<Object>) => {
  const event = (state: OrderBookState) => {
    let newSortedBids = new SortedArray([], (a, b) => b - a)
    let newSortedAsks = new SortedArray([], (a, b) => a - b)

    let newBids = bids.reduce((result, item) => {
      if (item.amount > 0) {
        result[item.price] = item
        if (newSortedBids.search(item.price) === -1) newSortedBids.insert(item.price)
      }

      return result
    }, {})

    let newAsks = asks.reduce((result, item) => {
      if (item.amount > 0) {
        result[item.price] = item
        if (newSortedAsks.search(item.price) === -1) newSortedAsks.insert(item.price)
      }

      return result
    }, {})

    return {
      ...state,
      bids: newBids,
      asks: newAsks,
      sortedBids: newSortedBids.array,
      sortedAsks: newSortedAsks.array
    }
  }

  return event
}

export const orderBookUpdated = (bids: Array<Object>, asks: Array<Object>) => {
  const event = (state: OrderBookState) => {
    let newSortedBids = new SortedArray(state.sortedBids, (a, b) => b - a)
    let newSortedAsks = new SortedArray(state.sortedAsks, (a, b) => a - b)

    let newBids = bids.reduce((result, item) => {
      if (item.amount > 0) {
        result[item.price] = item
        if (newSortedBids.search(item.price) === -1) newSortedBids.insert(item.price)
      }

      if (item.amount <= 0) {
        delete result[item.price]
        newSortedBids.remove(item.price)
      }

      return result
    }, {})

    let newAsks = asks.reduce((result, item) => {
      if (item.amount > 0) {
        result[item.price] = item
        if (newSortedAsks.search(item.price) === -1) newSortedAsks.insert(item.price)
      }

      if (item.amount <= 0) {
        delete result[item.price]
        newSortedAsks.remove(item.price)
      }

      return result
    }, {})

    return {
      ...state,
      bids: {
        ...state.bids,
        ...newBids
      },
      asks: {
        ...state.asks,
        ...newAsks
      },
      sortedBids: newSortedBids.array,
      sortedAsks: newSortedAsks.array
    }
  }

  return event
}

export const orderBookReset = () => {
  const event = (state: OrderBookState) => {
    return {
      ...state,
      bids: {},
      asks: {},
      sortedBids: [],
      sortedAsks: []
    }
  }

  return event
}

export default function domain(state: OrderBookState) {
  return {
    getState: () => state,
    getAsks: () => state.asks,
    getBids: () => state.bids,
    getSelectedOrder: () => state.selected,
    getOrderedBids: () => state.sortedBids.map(price => state.bids[price]),
    getOrderedAsks: () => state.sortedAsks.map(price => state.asks[price]),
    getOrderBookData: (ln: number) => {
      ln = ln || 300

      let bids = state.sortedBids
        .slice(0, Math.min(state.sortedBids.length, ln))
        .map(price => state.bids[price])
        .reduce((result, item) => {
          result.push({
            price: item.price,
            amount: item.amount,
            total: result.length > 0 ? result[result.length - 1].total + item.amount : item.amount,
          })
          return result
        }, [])

      let asks = state.sortedAsks
        .slice(0, Math.min(state.sortedAsks.length, ln))
        .map(price => state.asks[price])
        .reduce((result, item) => {
          result.push({
            price: item.price,
            amount: item.amount,
            total: result.length > 0 ? result[result.length - 1].total + item.amount : item.amount,
          })

          return result
        }, [])

      let max
      bids.length > 1 && asks.length > 1
        ? (max = Math.max(bids[bids.length - 1].total, asks[asks.length - 1].total))
        : (max = 0)

      bids = bids.map(item => ({
        ...item,
        relativeTotal: max ? item.total / max : 1,
      }))

      asks = asks.map(item => ({
        ...item,
        relativeTotal: max ? item.total / max : 1,
      }))

      return { asks, bids }
    },

    getBidPrice: () => (state.bids[state.sortedBids[0]] ? state.bids[state.sortedBids[0]].price : 0),
    getAskPrice: () => (state.asks[state.sortedAsks[0]] ? state.asks[state.sortedAsks[0]].price : 0),
    getBestBidMatcher: () => (state.bids[state.sortedBids[0]] ? state.bids[state.sortedBids[0]].matcher : null),
    getBestBidMatcherFeeRate: () => (state.bids[state.sortedBids[0]] ? state.bids[state.sortedBids[0]].matcher_fee_rate : 0),
    getBestAskMatcher: () => (state.asks[state.sortedAsks[0]] ? state.asks[state.sortedAsks[0]].matcher : null),
    getBestAskMatcherFeeRate: () => (state.asks[state.sortedAsks[0]] ? state.asks[state.sortedAsks[0]].matcher_fee_rate : 0),
    getQuoteToken: () => state.quoteToken,
    getBaseToken: () => state.baseToken
  }
}
