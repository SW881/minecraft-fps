import { useEffect, useState, useRef } from "react";

const usePersonControls = () => {
    const keys = {
        keyW: "forward",
        keyS: "backward",
        keyA: "left",
        keyD: "right",
        keyR: "reload",
        Space: "jump",
        Ctrl: "crouch",
    };

    const moveFieldByKey = (key) => {
        switch (key) {
            case 'KeyW': return keys.keyW;
            case 'KeyS': return keys.keyS;
            case 'KeyA': return keys.keyA;
            case 'KeyD': return keys.keyD;
            case 'KeyR': return keys.keyR;
            case 'Space': return keys.Space;
            case 'ControlLeft': return keys.Ctrl;
            default: return null;
        }
    };

    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
        crouch: false,
        reload: false
    });

    const pressedKeys = useRef({});

    useEffect(() => {
        const handleKeyDown = (ev) => {
            const action = moveFieldByKey(ev.code);
            if (action && !pressedKeys.current[ev.code]) {
                setMovement((m) => ({ ...m, [action]: true }));
                pressedKeys.current[ev.code] = true;
            }
        };

        const handleKeyUp = (ev) => {
            const action = moveFieldByKey(ev.code);
            if (action) {
                setMovement((m) => ({ ...m, [action]: false }));
                pressedKeys.current[ev.code] = false;
            }
        };

        const ac = new AbortController();
        const { signal } = ac;

        document.addEventListener('keydown', handleKeyDown, { signal });
        document.addEventListener('keyup', handleKeyUp, { signal });

        return () => {
            ac.abort();
        };
    }, []);

    return movement;
};

export default usePersonControls;