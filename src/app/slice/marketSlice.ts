// store.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the shape of the Market Order
export interface MarketOrder {
    side: 'B' | 'S';
    qty: number;
    executed_qty?: number;
    price: number;
    order_numbers: any[];
}

// Define the shape of the Market Data
export interface MarketData {
    id: number;
    session: string;
    short_name: string;
    full_name: string;
    filter_name: string;
    firm_id: string;
    trading_state: string;
    share_type: string;
    market_type: string;
    orderbook: number;
    date: string;
    lq: number;
    bq: number;
    aq: number;
    dl: number;
    dh: number;
    bid: number;
    ask: number;
    open: number;
    reference: number;
    last: number;
    volume: number;
    high: number;
    low: number;
    close: number;
    d: number;
    chg: number;
    settle_1: number;
    settle: number;
    status: string;
    val: number;
    vwap: number;
    sell_pending: number;
    buy_pending: number;
    board: string;
    group: string;
    instrument_type: string;
    ticker: string;
    sector: string;
    isin_code: string;
    trades: number;
    last_trade_time: string;
    orders: MarketOrder[];
    executed_orders?: MarketOrder[];
}

// Define the initial state and create a slice for the market data
interface MarketState {
    data: MarketData[];
}

const initialState: MarketState = {
    data: [],
};

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        updateMarketData(state, action: PayloadAction<MarketData | MarketData[]>) {
            // Normalize payload to always be an array
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.data = [...state.data, ...newData];
        },
        clearMarketData(state) {
            state.data = [];
        },
    },
});

export const { updateMarketData, clearMarketData } = marketSlice.actions;

export default marketSlice.reducer;
