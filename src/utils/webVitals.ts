import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

type VitalMetric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
};

const logMetric = (metric: Metric) => {
  const vitalMetric: VitalMetric = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  };

  // 控制台输出
  console.log(`[Web Vitals] ${metric.name}:`, vitalMetric);

  // 发送到Google Analytics（如果可用）
  type WindowWithGtag = typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof window !== 'undefined' && (window as WindowWithGtag).gtag) {
    (window as WindowWithGtag).gtag!('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.rating,
      custom_parameter_1: metric.id,
    });
  }

  // 发送到控制台作为性能标记
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(metric.name, {
      detail: vitalMetric,
    } as PerformanceMarkOptions);
  }
};

export const reportWebVitals = () => {
  if (typeof window === 'undefined') return;

  try {
    onCLS(logMetric);
    onINP(logMetric);
    onFCP(logMetric);
    onLCP(logMetric);
    onTTFB(logMetric);
  } catch (error) {
    console.error('[Web Vitals] Error reporting:', error);
  }
};

// 性能监控工具
export const measurePerformance = (label: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`[Performance] ${label}: ${(end - start).toFixed(2)}ms`);
};
