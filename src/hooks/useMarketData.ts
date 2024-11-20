// hooks/useMarketDataSocket.ts
import { useEffect, useRef } from 'react';
import { useAppDispatch } from './useRedux';
import { updateMarketData } from '../app/slice/marketSlice';

const useMarketDataSocket = () => {
    const dispatch = useAppDispatch();
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        wsRef.current = new WebSocket('wss://itch.skytrade.us/socket-api/v1/marketfeed/ws');

        wsRef.current.onopen = () => {
            console.log("WebSocket connection opened.");
        };

        wsRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                dispatch(updateMarketData(data));
            } catch (error) {
                console.error("Failed to parse WebSocket data:", error);
            }
        };

        wsRef.current.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            wsRef.current?.close();
        };
    }, [dispatch]);

    return null; // No need to return anything, as it's just managing side effects
};

export default useMarketDataSocket;
