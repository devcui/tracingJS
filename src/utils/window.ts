import { TraceScreen, TraceVisibleArea } from "../types";

`use strict`;



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
    const {screen} = win()
    return {
      availHeight: screen.availHeight,
      availWidth: screen.availWidth,
      colorDepth: screen.colorDepth,
      height: screen.height,
      pixelDepth: screen.pixelDepth,
      width: screen.width
    }
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
