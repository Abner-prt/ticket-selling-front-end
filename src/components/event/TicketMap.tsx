import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
  Handle
} from '@xyflow/react';
import type { Node, Edge, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Nodo personalizado para representar zonas de boletos
const TicketZoneNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={`
      relative w-48 p-4 rounded-xl shadow-lg border-2 transition-all duration-300
      ${selected ? 'border-amber-400 scale-105 shadow-[0_0_30px_rgba(251,191,36,0.3)]' : 'border-slate-700/50 hover:border-slate-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}
      bg-slate-900/80 backdrop-blur-sm overflow-hidden flex flex-col items-center cursor-pointer
    `}>
      <div className="z-10 relative flex flex-col items-center w-full">
        <h3 className="text-xl font-bold text-white mb-2">{data.label as string}</h3>
        <p className="text-sm font-medium text-amber-400 mb-1">Precio: L. {data.price as number}</p>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 mb-1">
          <div 
            className={`h-1.5 rounded-full ${(data.capacity as number) > 50 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
            style={{ width: `${Math.min(100, ((data.capacity as number) / 500) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400">{data.capacity as number} disponibles</p>
      </div>
      
      {/* Handles para conectar nodos estructuralmente */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const StageNode = ({ data }: NodeProps) => {
  return (
    <div className="w-80 md:w-96 py-6 rounded-t-full rounded-b-xl border-4 border-slate-700 bg-gradient-to-b from-blue-900/50 to-slate-900/80 backdrop-blur-md shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-black text-white tracking-[0.3em]">{data.label as string}</h2>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

const nodeTypes = {
  ticketZone: TicketZoneNode,
  stage: StageNode
};

const initialNodes: Node[] = [
  {
    id: 'stage',
    type: 'stage',
    position: { x: 250, y: 50 },
    data: { label: 'ESCENARIO' },
    draggable: false,
    selectable: false,
  },
  {
    id: 'vip',
    type: 'ticketZone',
    position: { x: 350, y: 200 },
    data: { label: 'VIP Central', price: 2500, capacity: 45 },
  },
  {
    id: 'general-a',
    type: 'ticketZone',
    position: { x: 100, y: 250 },
    data: { label: 'Silla A', price: 1200, capacity: 120 },
  },
  {
    id: 'general-b',
    type: 'ticketZone',
    position: { x: 600, y: 250 },
    data: { label: 'Silla B', price: 1200, capacity: 200 },
  },
  {
    id: 'grada',
    type: 'ticketZone',
    position: { x: 350, y: 400 },
    data: { label: 'Gradería General', price: 600, capacity: 800 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-stage-vip', source: 'stage', target: 'vip', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e-stage-a', source: 'stage', target: 'general-a', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e-stage-b', source: 'stage', target: 'general-b', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e-vip-grada', source: 'vip', target: 'grada', style: { stroke: '#64748b' } },
];

interface TicketMapProps {
  onSelectZone: (zoneData: any) => void;
}

export function TicketMap({ onSelectZone }: TicketMapProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.type === 'ticketZone') {
      onSelectZone(node.data);
    }
  }, [onSelectZone]);

  return (
    <div className="w-full h-full min-h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-medium text-slate-300">
        Interactúa con el mapa y selecciona tu zona
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={24} size={1} />
        <Controls 
          className="bg-slate-900 border-slate-700 fill-white rounded-lg overflow-hidden" 
          showInteractive={false} 
        />
      </ReactFlow>
    </div>
  );
}
