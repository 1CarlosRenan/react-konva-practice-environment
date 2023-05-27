import React, { useState } from 'react';
import { Rect, Transformer } from 'react-konva';
import Konva from 'konva';

const DraggableComponent = ({ id, x, y, isSelected, onSelect, onChange }) => {
  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 5,
        y: 5
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };

  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    });

    onChange(id, e.target.x(), e.target.y());
  };

  return (
    <Rect
      x={x}
      y={y}
      width={100}
      height={50}
      fill={isSelected ? 'green' : 'blue'}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onSelect}
    />
  );
};


export default DraggableComponent;
