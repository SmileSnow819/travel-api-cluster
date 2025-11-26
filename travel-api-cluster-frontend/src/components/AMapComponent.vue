<template>
  <div class="amap-wrapper">
    <v-sheet width="100%" class="map-card" elevation="4">
      <v-card-title class="map-title">
        <v-icon left color="primary">mdi-map-marker</v-icon>
        旅游路线地图
      </v-card-title>
      <v-card-text class="pa-0">
        <div
          :id="mapId"
          class="amap-container"
          :style="{ height: mapHeight + 'px' }"
        ></div>
      </v-card-text>
      <v-card-actions v-if="showControls" class="pa-3">
        <v-btn
          size="small"
          variant="outlined"
          @click="fitToMarkers"
          prepend-icon="mdi-fit-to-page-outline"
        >
          显示全部
        </v-btn>
        <v-btn
          size="small"
          variant="outlined"
          @click="toggleRouteVisible"
          :prepend-icon="routeVisible ? 'mdi-eye-off' : 'mdi-eye'"
        >
          {{ routeVisible ? '隐藏路线' : '显示路线' }}
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Props 定义
interface Location {
  coordinates: [number, number]; // [经度, 纬度]
  description: string;
  day?: number;
  address?: string;
}

interface Props {
  startLocation?: Location;
  locations?: Location[];
  mapHeight?: number;
  showControls?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mapHeight: 400,
  showControls: true,
  locations: () => [],
});

// 响应式数据
const mapId = ref(`amap-${Date.now()}`);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const map = ref<any>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const markers = ref<any[]>([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const polyline = ref<any>(null);
const routeVisible = ref(true);

// 方法
const initMap = () => {
  console.log('初始化地图，props:', {
    startLocation: props.startLocation,
    locations: props.locations,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(window as any).AMap) {
    console.error('高德地图API未加载');
    return;
  }

  // 计算地图中心点
  const allLocations = [
    ...(props.startLocation ? [props.startLocation] : []),
    ...props.locations,
  ];
  let center = [116.397428, 39.90923]; // 默认北京

  if (allLocations.length > 0) {
    const avgLng =
      allLocations.reduce((sum, loc) => sum + loc.coordinates[0], 0) /
      allLocations.length;
    const avgLat =
      allLocations.reduce((sum, loc) => sum + loc.coordinates[1], 0) /
      allLocations.length;
    center = [avgLng, avgLat];
  }

  // 创建地图
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map.value = new (window as any).AMap.Map(mapId.value, {
    zoom: 8,
    center: center,
    mapStyle: 'amap://styles/normal',
    features: ['bg', 'road', 'building', 'point'],
  });

  // 添加控件
  map.value.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.value.addControl(new (window as any).AMap.ToolBar());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.value.addControl(new (window as any).AMap.Scale());
  });

  addMarkers();
  drawRoute();
};

const addMarkers = () => {
  clearMarkers();

  const allLocations = [
    ...(props.startLocation ? [{ ...props.startLocation, isStart: true }] : []),
    ...props.locations.map((loc, index) => ({
      ...loc,
      dayNumber: loc.day || index + 1,
    })),
  ];

  console.log('添加标记，所有位置:', allLocations);
  console.log('起始位置:', props.startLocation);
  console.log('旅游位置:', props.locations);

  if (allLocations.length === 0) {
    console.log('没有位置数据可显示');
    return;
  }

  allLocations.forEach((location, index) => {
    const isStart = 'isStart' in location;
    console.log(`创建标记 ${index + 1}:`, location);

    try {
      // 创建标记
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const marker = new (window as any).AMap.Marker({
        position: location.coordinates,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        icon: new (window as any).AMap.Icon({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          size: new (window as any).AMap.Size(
            isStart ? 40 : 35,
            isStart ? 52 : 48
          ),
          image: isStart
            ? `data:image/svg+xml;base64,${btoa(`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50C20 50 37 24.399 37 15C37 6.71573 29.2843 0 20 0C10.7157 0 3 6.71573 3 15C3 24.399 20 50 20 50Z" fill="#FF4454" stroke="white" stroke-width="2"/>
              <path d="M20 8.5C16.9624 8.5 14.5 10.9624 14.5 14C14.5 17.0376 16.9624 19.5 20 19.5C23.0376 19.5 25.5 17.0376 25.5 14C25.5 10.9624 23.0376 8.5 20 8.5ZM20 17C18.3431 17 17 15.6569 17 14C17 12.3431 18.3431 11 20 11C21.6569 11 23 12.3431 23 14C23 15.6569 21.6569 17 20 17Z" fill="white"/>
              <text x="20" y="38" fill="white" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle">起点</text>
            </svg>`)}`
            : `data:image/svg+xml;base64,${btoa(`<svg width="35" height="48" viewBox="0 0 35 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 46C17.5 46 32 23.048 32 15C32 6.71573 25.2843 0 17.5 0C9.71573 0 3 6.71573 3 15C3 23.048 17.5 46 17.5 46Z" fill="#2196F3" stroke="white" stroke-width="2"/>
              <path d="M17.5 8C14.7386 8 12.5 10.2386 12.5 13C12.5 15.7614 14.7386 18 17.5 18C20.2614 18 22.5 15.7614 22.5 13C22.5 10.2386 20.2614 8 17.5 8ZM17.5 15.5C16.1193 15.5 15 14.3807 15 13C15 11.6193 16.1193 10.5 17.5 10.5C18.8807 10.5 20 11.6193 20 13C20 14.3807 18.8807 15.5 17.5 15.5Z" fill="white"/>
              <circle cx="17.5" cy="35" r="8" fill="white"/>
              <text x="17.5" y="19" fill="#2196F3" font-family="Arial" font-size="11" font-weight="bold" text-anchor="middle">${
                location.dayNumber || index + 1
              }</text>
            </svg>`)}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          imageOffset: new (window as any).AMap.Pixel(
            isStart ? -20 : -17.5,
            isStart ? -52 : -48
          ),
        }),
        title: location.description,
        extData: location,
      });

      // 添加点击事件
      marker.on('click', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const infoWindow = new (window as any).AMap.InfoWindow({
          content: `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">
              ${
                isStart
                  ? '🚩 起始地点'
                  : `📍 第${location.dayNumber || index + 1}天`
              }
            </div>
            <div style="margin-bottom: 4px;">${location.description}</div>
            ${
              location.address
                ? `<div style="font-size: 12px; color: #666;">${location.address}</div>`
                : ''
            }
          </div>
        `,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          offset: new (window as any).AMap.Pixel(0, -40),
        });
        infoWindow.open(map.value, location.coordinates);
      });

      map.value.add(marker);
      markers.value.push(marker);
      console.log(`标记 ${index + 1} 创建成功`);
    } catch (error) {
      console.error(`创建标记 ${index + 1} 失败:`, error);
    }
  });
};

const drawRoute = () => {
  if (polyline.value) {
    map.value.remove(polyline.value);
    polyline.value = null;
  }

  const allLocations = [
    ...(props.startLocation ? [props.startLocation] : []),
    ...props.locations,
  ];

  if (allLocations.length < 2) return;

  const path = allLocations.map((loc) => loc.coordinates);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  polyline.value = new (window as any).AMap.Polyline({
    path: path,
    strokeColor: '#FF6B6B',
    strokeWeight: 6,
    strokeStyle: 'solid',
    strokeOpacity: 0.9,
    lineJoin: 'round',
    lineCap: 'round',
    // 添加边框效果
    borderWeight: 8,
    borderColor: '#FFFFFF',
    // 添加阴影
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 4,
  });

  // 实现从起点到终点的逐渐描边动画
  const animatePolylineDrawing = () => {
    if (!path || path.length < 2) return;

    // 先隐藏完整路线
    polyline.value.hide();

    // 创建动画变量
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let animationPolyline: any = null;
    const totalPoints = path.length;
    const stepsPerSegment = 15; // 每段路径的插值步数
    let currentPointIndex = 0;
    let currentStep = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animatedPath: any[] = [path[0]]; // 从起点开始

    console.log('开始描边动画，总共', totalPoints, '个点');

    const drawNextStep = () => {
      if (currentPointIndex >= totalPoints - 1) {
        // 动画完成
        console.log('描边动画完成');
        // 显示完整路线并添加闪烁效果
        polyline.value.show();
        addFlashingEffect();
        // 3秒后重新开始
        setTimeout(() => {
          console.log('重新开始描边动画');
          animatePolylineDrawing();
        }, 3000);
        return;
      }

      const startPoint = path[currentPointIndex];
      const endPoint = path[currentPointIndex + 1];
      const progress = currentStep / stepsPerSegment;

      // 线性插值计算中间点
      const interpolatedPoint = [
        startPoint[0] + (endPoint[0] - startPoint[0]) * progress,
        startPoint[1] + (endPoint[1] - startPoint[1]) * progress,
      ];

      // 添加插值点到动画路径
      if (currentStep > 0) {
        animatedPath[animatedPath.length - 1] = interpolatedPoint;
      }

      // 移除之前的动画路线
      if (animationPolyline) {
        map.value.remove(animationPolyline);
      }

      // 创建新的动画路线
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animationPolyline = new (window as any).AMap.Polyline({
        path: [...animatedPath],
        strokeColor: '#FF4454',
        strokeWeight: 8,
        strokeStyle: 'solid',
        strokeOpacity: 1,
        lineJoin: 'round',
        lineCap: 'round',
        // 添加发光效果
        shadowColor: '#FF4454',
        shadowBlur: 15,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      });

      map.value.add(animationPolyline);

      currentStep++;

      if (currentStep > stepsPerSegment) {
        // 当前段完成，移动到下一段
        animatedPath.push(endPoint);
        currentPointIndex++;
        currentStep = 0;
        console.log(`完成第 ${currentPointIndex} 段，共 ${totalPoints - 1} 段`);
      }

      // 继续下一帧，速度控制
      setTimeout(drawNextStep, 80);
    };

    // 开始动画
    drawNextStep();
  };

  // 添加闪烁效果
  const addFlashingEffect = () => {
    let flashCount = 0;
    const maxFlashes = 8;

    const flash = () => {
      if (flashCount >= maxFlashes) {
        // 闪烁完成，恢复正常状态
        if (polyline.value) {
          polyline.value.setOptions({
            strokeOpacity: 0.9,
            strokeWeight: 6,
            strokeColor: '#FF6B6B',
          });
        }
        return;
      }

      const isVisible = flashCount % 2 === 0;
      if (polyline.value) {
        polyline.value.setOptions({
          strokeOpacity: isVisible ? 1 : 0.3,
          strokeWeight: isVisible ? 8 : 4,
          strokeColor: isVisible ? '#FF4454' : '#FFB6C1',
        });
      }

      flashCount++;
      setTimeout(flash, 150);
    };

    flash();
  };

  // 启动描边动画
  setTimeout(() => {
    console.log('延迟1.5秒后启动描边动画');
    animatePolylineDrawing();
  }, 1500);

  map.value.add(polyline.value);
};

const clearMarkers = () => {
  markers.value.forEach((marker) => {
    map.value.remove(marker);
  });
  markers.value = [];
};

const fitToMarkers = () => {
  if (markers.value.length === 0) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bounds = new (window as any).AMap.Bounds();
  markers.value.forEach((marker) => {
    bounds.extend(marker.getPosition());
  });

  map.value.setBounds(bounds, false, [20, 20, 20, 20]);
};

const toggleRouteVisible = () => {
  routeVisible.value = !routeVisible.value;
  if (polyline.value) {
    if (routeVisible.value) {
      polyline.value.show();
    } else {
      polyline.value.hide();
    }
  }
};

// 监听props变化
watch(
  () => [props.startLocation, props.locations],
  () => {
    if (map.value) {
      addMarkers();
      drawRoute();
      setTimeout(() => {
        fitToMarkers();
      }, 500);
    }
  },
  { deep: true }
);

// 生命周期
onMounted(() => {
  // 延迟初始化以确保DOM准备好
  setTimeout(() => {
    initMap();
    setTimeout(() => {
      fitToMarkers();
    }, 1000);
  }, 100);
});

onUnmounted(() => {
  if (map.value) {
    map.value.destroy();
  }
});
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  margin: 16px 0;
}

.map-card {
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  /* Natours 倾斜设计风格 */
  position: relative;
  clip-path: polygon(0 0, 100% 0%, 100% 92%, 0% 100%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #7dd56f, #28b487) border-box;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.map-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.map-title {
  background: linear-gradient(135deg, #7dd56f 0%, #28b487 100%);
  color: white !important;
  padding: 16px 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 1.1rem;
  position: relative;
}

.map-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #55c57a, #28b487, #7dd56f);
}

.amap-container {
  width: 100% !important;
  min-height: 300px;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(125, 213, 111, 0.05),
    rgba(40, 180, 135, 0.05)
  );
}

/* 高德地图控件样式调整 */
:deep(.amap-logo) {
  opacity: 0.6;
  border-radius: 6px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.9);
}

:deep(.amap-copyright) {
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 2px 6px;
  color: #666 !important;
}

/* 添加地图控制按钮的Natours样式 */
:deep(.v-btn) {
  border-radius: 25px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s ease !important;
}

:deep(.v-btn:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(40, 180, 135, 0.3) !important;
}

/* 地图卡片操作区域 */
:deep(.v-card-actions) {
  background: linear-gradient(
    135deg,
    rgba(125, 213, 111, 0.1),
    rgba(40, 180, 135, 0.1)
  );
  border-top: 1px solid rgba(125, 213, 111, 0.2);
  padding: 16px 20px !important;
}
</style>
