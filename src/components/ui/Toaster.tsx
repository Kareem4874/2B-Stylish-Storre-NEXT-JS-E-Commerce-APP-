"use client"
import React, { useEffect, useState } from "react";

type ToastItem = { 
    id: number; 
    title?: string; 
    description?: string; 
    type?: "success" | "error" | "info";
    durationMs?: number;
};

export default function Toaster(){
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail as Omit<ToastItem, 'id'>;
            const id = Date.now() + Math.random();
            const duration = detail.durationMs ?? 2500;
            setToasts(prev => [...prev, { id, ...detail }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        };
        window.addEventListener("app:toast", handler as EventListener);
        return () => window.removeEventListener("app:toast", handler as EventListener);
    }, []);

    return (
        <div className="fixed z-[1000] top-4 right-4 space-y-3">
            {toasts.map(t => {
                const color = "green";
                return (
                    <div 
                      key={t.id}
                      className={`min-w-[260px] max-w-sm rounded-xl shadow-xl ring-1 ring-black/5 backdrop-blur bg-white/90 text-slate-800 overflow-hidden`}
                    >
                        <div className={`flex items-start gap-3 p-3 border-l-4 border-${color}-500`}
                        >
                            <div className={`mt-0.5 text-${color}-600`}>
                                {t.type === 'success' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/></svg>
                                )}
                                {t.type === 'error' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.401 1.592c1.155-2.014 4.043-2.014 5.198 0l8.23 14.35c1.155 2.014-.289 4.535-2.599 4.535H3.77c-2.31 0-3.754-2.52-2.6-4.535l8.231-14.35Zm2.599 4.158a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0V5.75Zm-.75 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clipRule="evenodd"/></svg>
                                )}
                                {!t.type && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.25 9a.75.75 0 1 1 1.5 0v5.25a.75.75 0 1 1-1.5 0V9Z"/><path d="M12 19.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"/><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clipRule="evenodd"/></svg>
                                )}
                            </div>
                            <div className="flex-1">
                                {t.title && <div className="font-semibold leading-5">{t.title}</div>}
                                {t.description && <div className="text-sm text-slate-600 mt-0.5 leading-5">{t.description}</div>}
                            </div>
                            <button
                              onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                              className="text-slate-400 hover:text-slate-600"
                              aria-label="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/></svg>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


