`use strict`;


import {TraceScreen, TraceVisibleArea} from "../trace";

let _win: Window;
export const win = (argWin?: Window): Window => {
    if (_win) return _win
    if (argWin) {
        _win = argWin;
    }
    return _win;
};


export class Win {
    static screenArgs(): TraceScreen {
        return win().screen
    }

    static visibleArea(): TraceVisibleArea {
        const {clientWidth, clientHeight} = win().document.documentElement;
        return {
            height: clientHeight,
            width: clientWidth
        }
    }

    static url(): string {
        return win().location.href
    }
}