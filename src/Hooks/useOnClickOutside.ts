import {RefObject, useEffect} from "react";

export function useOnClickOutside(ref: RefObject<any>,
                                  handler: (event: MouseEvent | TouchEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return
            handler(event)
        }
        const el = document.querySelector('.right-side__content') as HTMLElement;

            el.addEventListener("click", listener);

        return () => {
            el.addEventListener("click", listener);
        };
    }, [ref, handler]);
}