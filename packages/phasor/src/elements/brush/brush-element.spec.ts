import { describe, expect, it } from 'vitest';

import { BrushElement } from './brush-element.js';

const data = {
  id: '1',
  color: '#000000',
  anchor: '10,10',
  points: JSON.stringify([
    [0, 0],
    [0, 80.15],
    [0, 80.15],
    [0.44, 79.48],
    [2.65, 78.11],
    [5.81, 76],
    [11.57, 72.17],
    [19.8, 67.99],
    [25.71, 65.29],
    [32.26, 62.85],
    [38.72, 60.69],
    [49.07, 58.56],
    [60.49, 56.54],
    [80.61, 53.95],
    [102.76, 51.28],
    [121.68, 50.69],
    [138.03, 50.69],
    [149.01, 50.69],
    [158.27, 50.69],
    [176.51, 50.69],
    [202.85, 50.69],
    [219.39, 50.69],
    [242.16, 53.68],
    [265.83, 58.84],
    [280.85, 62.6],
    [294.89, 66.73],
    [307.45, 70.93],
    [320.66, 75.77],
    [333.69, 80.86],
    [341.7, 84],
    [346.54, 85.92],
    [354.85, 89.26],
    [364.51, 93.11],
    [373.18, 97.38],
    [380.86, 101.49],
    [385.66, 103.78],
    [392.75, 107.54],
    [397.86, 110.58],
    [401.38, 112.43],
    [404.83, 114.17],
    [407.92, 116.09],
    [411.07, 118.25],
    [412.59, 119.37],
    [414.17, 120.49],
    [415.6, 121.62],
    [416.46, 122.5],
    [417.01, 123.03],
    [417.39, 123.58],
    [417.66, 124.13],
    [417.95, 124.69],
    [418.21, 125.24],
    [418.31, 126.04],
    [418.31, 126.94],
    [418.31, 127.85],
    [418.31, 128.75],
    [418.31, 130.02],
    [418.31, 131.32],
    [418.31, 132.67],
    [418.31, 133.97],
    [418.31, 135.36],
    [418.31, 136.65],
    [418.31, 138.03],
    [418.31, 140.2],
    [418.31, 141.99],
    [418.31, 144.62],
    [418.31, 147.14],
    [418.31, 148.43],
    [418.31, 150.01],
    [418.31, 151.77],
    [418.31, 153.6],
    [418.31, 155.35],
    [418.31, 157.16],
    [418.31, 158.91],
    [418.31, 160.74],
    [417.79, 164.27],
    [417.09, 166.02],
    [416.36, 167.58],
    [415.7, 168.88],
    [414.97, 170.61],
    [414.27, 172.37],
    [413.64, 173.68],
    [412.97, 174.98],
    [412.34, 176.24],
    [411.69, 177.53],
    [410.57, 178.79],
    [409.27, 180.24],
    [408.66, 181.13],
    [407.41, 182.53],
    [405.6, 184.13],
    [404.19, 185.19],
    [402.99, 186.22],
    [402.01, 187.19],
    [400.79, 187.98],
    [399.5, 188.62],
    [398.41, 189.27],
    [397.52, 189.86],
    [396.56, 190.49],
    [395.67, 191.08],
    [394.37, 191.75],
    [393.08, 192.4],
    [392.07, 192.78],
    [391.15, 193.08],
    [390.24, 193.64],
    [389.34, 194.25],
    [387.93, 194.63],
    [385.95, 195.12],
    [384.63, 195.45],
    [381.74, 195.98],
    [378.46, 196.55],
    [376.69, 196.89],
    [374.91, 197.24],
    [373.14, 197.6],
    [371.03, 197.96],
    [368.76, 198.34],
    [367.01, 198.48],
    [365.69, 198.48],
    [362.41, 198.48],
    [358.3, 198.48],
    [355.34, 198.48],
    [353.07, 198.48],
    [350.27, 198.48],
    [347.43, 198.48],
    [344.1, 198.48],
    [340.65, 198.48],
    [338.74, 198.48],
    [337.45, 198.48],
    [335.18, 198.48],
    [332.91, 198.48],
    [331.63, 198.48],
    [328.78, 198.48],
    [325.69, 198.25],
    [323.42, 197.89],
    [321.38, 197.28],
    [319.61, 196.57],
    [318.07, 196.08],
    [316.77, 195.75],
    [315.09, 195.16],
    [313.34, 194.44],
    [311.85, 194],
    [310.54, 193.66],
    [308.79, 193.01],
    [307.03, 192.3],
    [304.76, 191.52],
    [302.5, 190.76],
    [298.95, 189.44],
    [295.5, 188.15],
    [291.94, 186.81],
    [286.45, 184.6],
    [282.16, 182.72],
    [275.95, 180.41],
    [267.7, 177.65],
    [262.53, 175.86],
    [260.78, 175.15],
    [258.36, 174.12],
    [255.52, 172.9],
    [252.53, 171.62],
    [249.69, 170.41],
    [245.84, 168.39],
    [241.47, 165.96],
    [239.3, 164.44],
    [238.31, 163.47],
    [235.36, 162.17],
    [231.91, 160.88],
    [230.48, 160.36],
    [229.56, 160.06],
    [227.93, 159.41],
    [226.17, 158.7],
    [224.09, 157.87],
    [221.64, 156.65],
    [220.15, 155.56],
    [217.69, 154.32],
    [214.17, 152.89],
    [210.98, 151.25],
    [208.54, 149.61],
    [206.98, 148.57],
    [206.09, 147.97],
    [204.6, 147.06],
    [202.85, 146.01],
    [201.24, 144.89],
    [199.82, 143.84],
    [198.16, 142.77],
    [196.39, 141.71],
    [194, 140.16],
    [191.58, 138.54],
    [189.41, 136.88],
    [187.5, 135.36],
    [185.5, 133.76],
    [183.6, 132.23],
    [181.5, 130.19],
    [179.01, 127.68],
    [177.9, 126.57],
    [175.88, 124.17],
    [172.85, 120.4],
    [170.72, 117.67],
    [169.67, 116.26],
    [168.28, 114.51],
    [166.77, 112.6],
    [165.76, 111.04],
    [165.11, 109.75],
    [164.46, 108.68],
    [163.87, 107.76],
    [163.21, 106.54],
    [162.56, 105.25],
    [162.12, 103.9],
    [161.78, 102.6],
    [161.13, 100.54],
    [160.37, 98.27],
    [160.18, 95.82],
    [160.18, 93.55],
    [159.83, 90.73],
    [159.41, 87.89],
    [159.36, 84.25],
    [159.36, 78.76],
    [159.36, 74.43],
    [159.36, 68.22],
    [159.36, 59.97],
    [159.36, 54.78],
    [159.36, 53.03],
    [159.36, 50.21],
    [159.36, 46.74],
    [159.36, 43.52],
    [159.36, 40.68],
    [159.36, 38.17],
    [159.36, 35.9],
    [159.36, 33.96],
    [159.36, 32.18],
    [159.36, 30.64],
    [159.36, 29.32],
    [159.36, 28.31],
    [159.36, 27.42],
    [159.62, 26.45],
    [159.93, 25.55],
    [159.95, 24.94],
    [160.08, 24.12],
    [160.35, 23.55],
    [160.48, 22.39],
    [160.48, 21.17],
    [160.48, 20.62],
    [160.65, 19.83],
    [160.96, 18.94],
    [161.07, 18.02],
    [161.07, 17.13],
    [161.26, 16.19],
    [161.55, 15.3],
    [161.66, 14.38],
    [161.66, 13.49],
    [161.87, 12.52],
    [162.18, 11.6],
    [162.25, 10.67],
    [162.25, 9.77],
    [162.46, 9.1],
    [162.73, 8.57],
    [162.79, 7.68],
    [162.79, 6.78],
    [163.02, 6.42],
    [163.4, 5.9],
    [163.66, 5.35],
    [163.8, 4.51],
    [164.05, 3.73],
    [164.29, 3.33],
    [164.29, 3.06],
    [164.45, 2.82],
    [164.69, 2.57],
    [164.77, 2.3],
    [164.77, 2.05],
    [164.94, 1.96],
    [165.19, 1.96],
    [165.26, 1.77],
    [165.26, 1.52],
    [165.46, 1.25],
    [165.7, 0.99],
    [165.74, 0.72],
    [165.74, 0.49],
    [165.99, 0.47],
    [166.24, 0.47],
    [166.24, 0.22],
    [166.45, 0],
  ]),
};

describe('brush element', () => {
  it('deserialize', () => {
    const element = BrushElement.deserialize(data);
    const lineWidth = element.lineWidth;
    expect(element.id).equal(data.id);
    expect(element.color).equal(data.color);
    expect(element.anchor.join(',')).equal(data.anchor);
    expect(element.x).equal(10 - lineWidth / 2);
    expect(element.y).equal(10 - lineWidth / 2);
    expect(element.w).equal(418.31 + lineWidth);
    expect(element.h).equal(198.48 + lineWidth);
  });

  it('serialize', () => {
    const element = BrushElement.deserialize(data);
    const serialized = element.serialize();
    expect(serialized.id).equal(data.id);
    expect(serialized.color).equal(data.color);
    expect(serialized.anchor).equal(data.anchor);
    expect(serialized.points).equal(data.points);
  });

  it('hit test', () => {
    const element = BrushElement.deserialize(data);
    expect(element.hitTest(8, 8)).toBeTruthy();
    // point is in rect, but not in path
    expect(element.hitTest(300, 100)).toBeTruthy();
  });

  it('transform', () => {
    const element = BrushElement.deserialize(data);
    const changed = BrushElement.transform(element, {
      x: 0,
      y: 0,
      w: element.w,
      h: element.h,
    });
    expect(changed.anchor).toBe('2,2');
  });
});
