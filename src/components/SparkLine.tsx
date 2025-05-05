import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SmoothSparkline = ({
  data,
  color = '#2EFC6E',
  width = 100,
  height = 50,
}) => {
  if (!data || data.length === 0) return null;

  // Normalize the data points to fit within the width and height
  const min = Math.min(...data);
  const max = Math.max(...data);
  const normalizedData = data.map(value => (value - min) / (max - min));

  // Generate points for the line
  const points = normalizedData.map((value, index) => ({
    x: (index / (normalizedData.length - 1)) * width,
    y: height - value * height,
  }));

  // Generate a smooth path using cubic Bézier curves
  const getSmoothPath = pts => {
    if (pts.length < 2) return '';

    const path = [`M${pts[0].x},${pts[0].y}`];
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const midPointX = (prev.x + curr.x) / 2;
      path.push(`Q${prev.x},${prev.y} ${midPointX},${(prev.y + curr.y) / 2}`);
    }
    path.push(`T${pts[pts.length - 1].x},${pts[pts.length - 1].y}`);
    return path.join(' ');
  };

  const pathD = getSmoothPath(points);

  return (
    <View style={{width, height}}>
      <Svg width={width} height={height}>
        <Path d={pathD} fill="none" stroke={color} strokeWidth={2} />
      </Svg>
    </View>
  );
};

export default SmoothSparkline;
