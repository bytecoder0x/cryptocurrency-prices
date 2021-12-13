const PADDING = 8;

export function drawSparkline(canvas, prices, isUp) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  if (prices.length < 2) {
    return;
  }

  const color = isUp ? '#22a06b' : '#e5484d';
  const fillColor = isUp ? 'rgba(34, 160, 107, 0.3)' : 'rgba(229, 72, 77, 0.3)';
  const fillColorEnd = isUp ? 'rgba(34, 160, 107, 0)' : 'rgba(229, 72, 77, 0)';

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  let range = max - min;

  if (range === 0) {
    range = 1;
  }

  const stepX = (width - PADDING * 2) / (prices.length - 1);
  const chartHeight = height - PADDING * 2;
  const bottom = height - PADDING;
  const points = [];

  for (let i = 0; i < prices.length; i++) {
    points.push({
      x: PADDING + i * stepX,
      // y goes from top so max price is on top
      y: PADDING + ((max - prices[i]) / range) * chartHeight,
    });
  }

  // fill under line
  const gradient = ctx.createLinearGradient(0, PADDING, 0, bottom);
  gradient.addColorStop(0, fillColor);
  gradient.addColorStop(1, fillColorEnd);

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, bottom);
  ctx.lineTo(points[0].x, bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.stroke();
}
