import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { v4 as uuid } from 'uuid';


import DraggableComponent from './DraggableComponent';

const Workspace = () => {
  const [components, setComponents] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [draggingLine, setDraggingLine] = useState(false);

  const handleAddComponent = () => {
    const newComponent = {
      id: uuid(),
      x: 100,
      y: 100
    };

    setComponents([...components, newComponent]);
  };

  const handleComponentSelect = (componentId) => {
    setSelectedComponentId(componentId);
  };

  const handleComponentMove = (componentId, x, y) => {
    const updatedComponents = components.map((component) => {
      if (component.id === componentId) {
        return { ...component, x, y };
      }
      return component;
    });

    setComponents(updatedComponents);
  };

  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setDraggingLine(true);
    }
  };

  const handleStageMouseUp = () => {
    if (draggingLine) {
      const line = {
        id: uuid(),
        startId: selectedComponentId,
        startX: components[selectedComponentId].x + 50,
        startY: components[selectedComponentId].y + 25,
        endId: null,
        endX: 0,
        endY: 0
      };

      setLines([...lines, line]);
      setSelectedComponentId(null);
      setDraggingLine(false);
    }
  };

  const handleLineMouseUp = (lineId, componentId) => {
    const updatedLines = lines.map((line) => {
      if (line.id === lineId) {
        return { ...line, endId: componentId, endX: components[componentId].x + 50, endY: components[componentId].y + 25 };
      }
      return line;
    });

    setLines(updatedLines);
  };

  return (
    <div>
      <Stage
        width={800}
        height={600}
        onMouseDown={handleStageMouseDown}
        onMouseUp={handleStageMouseUp}
      >
        <Layer>
          {lines.map((line) => (
            <Line
              key={line.id}
              points={[line.startX, line.startY, line.endX, line.endY]}
              stroke="black"
              strokeWidth={2}
              onMouseUp={() => handleLineMouseUp(line.id, line.endId)}
            />
          ))}
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              x={component.x}
              y={component.y}
              isSelected={component.id === selectedComponentId}
              onSelect={() => handleComponentSelect(component.id)}
              onChange={handleComponentMove}
            />
          ))}
        </Layer>
      </Stage>
      <button onClick={handleAddComponent}>Adicionar Componente</button>
    </div>
  );
};


export default Workspace;
