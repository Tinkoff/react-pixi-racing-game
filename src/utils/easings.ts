const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

// https://github.com/ai/easings.net/blob/master/src/easings/easingsFunctions.ts
export const bounceOut = (x: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};

export const easeOutBack = (x: number): number => {
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
};

export const easeInOutBack = (x: number): number => {
  return x < 0.5
    ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

export const easeInCirc = (x: number): number => {
  return 1 - sqrt(1 - pow(x, 2));
};

export const easeInCircOutBack = (x: number): number => {
  return x < 0.5 ? (1 - easeInCirc(1 - 2 * x)) / 2 : (1 + easeOutBack(2 * x - 1)) / 2;
};

export const easeInOutQuad = (x: number): number => {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
};

export const easeOutCubic = (x: number): number => {
  return 1 - pow(1 - x, 3);
};
