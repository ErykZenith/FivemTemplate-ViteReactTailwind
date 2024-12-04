import { useState, useEffect, useCallback } from 'react';

const useMessageHandler = () => {
    const [actionHandlers, setActionHandlers] = useState<Record<string, (data: any) => void>>({});

    const addActionHandler = useCallback((action: string, handler: (data: any) => void) => {
        setActionHandlers(prev => ({
            ...prev,
            [action]: handler
        }));
    }, []);

    useEffect(() => {
        const eventListener = (event: MessageEvent<any>) => {
            const { action, data } = event.data || {};
            const handler = actionHandlers[action];
            if (handler) {
                handler(data);
            } else {
                console.warn(`No handler found for action: ${action}`);
            }
        };

        window.addEventListener('message', eventListener);
        return () => {
            window.removeEventListener('message', eventListener);
        };
    }, [actionHandlers]);

    return { addActionHandler };
};

export default useMessageHandler