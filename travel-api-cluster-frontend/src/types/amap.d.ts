// 高德地图API类型声明
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AMap: any;
  }
}

// 高德地图相关类型定义
export interface AMapInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add(overlay: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remove(overlay: any): void;
  destroy(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBounds(bounds: any, immediately?: boolean, avoid?: number[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addControl(control: any): void;
  plugin(plugins: string[], callback: () => void): void;
}

export interface AMapMarker {
  on(event: string, callback: () => void): void;
  getPosition(): [number, number];
}

export interface AMapPolyline {
  show(): void;
  hide(): void;
}

export {};
