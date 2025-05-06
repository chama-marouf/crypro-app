import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Rect} from 'react-native-svg';
import {theme} from '../theme';

type Candle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type Props = {
  data: Candle[];
  width?: number;
  height?: number;
};

const CandlestickChart: React.FC<Props> = ({
  data,
  width = 350,
  height = 300,
}) => {
  if (!data.length) return null;

  const padding = 16;
  const candleWidth = 8;
  const spacing = 6;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const prices = data.flatMap(d => [d.high, d.low]);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  const priceToY = (price: number) =>
    padding + ((maxPrice - price) / (maxPrice - minPrice)) * chartHeight;

  return (
    <View style={{width, height}}>
      <Svg width={width} height={height}>
        {data.map((candle, i) => {
          const x = padding + i * (candleWidth + spacing);
          const yOpen = priceToY(candle.open);
          const yClose = priceToY(candle.close);
          const yHigh = priceToY(candle.high);
          const yLow = priceToY(candle.low);

          const isBull = candle.close >= candle.open;
          const fillColor = isBull ? theme.colors.accent : theme.colors.error;

          return (
            <React.Fragment key={i}>
              {/* Wick */}
              <Line
                x1={x + candleWidth / 2}
                x2={x + candleWidth / 2}
                y1={yHigh}
                y2={yLow}
                stroke={fillColor}
                strokeWidth={2}
              />
              {/* Body */}
              <Rect
                x={x}
                y={Math.min(yOpen, yClose)}
                width={candleWidth}
                height={Math.abs(yClose - yOpen) || 1}
                fill={fillColor}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default CandlestickChart;
