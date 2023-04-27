import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

export const LoadGraph = () => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
      const graph = new Graph();
      graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
      graph.addNode("second", { x: 50, y: 50, size: 15, label: "My second node", color: "#FA4F40" });
      graph.addEdge("first", "second")
      loadGraph(graph);
    }, [loadGraph]);
  
    return null;
}

export const GraphDisplay = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-between'>
                 <div className='grid md:grid-cols-4 m-auto h-auto bg-slate-500'>
                    <div className='sigma-container'></div>
                        <div className='w-full m-0 p-4'>
                         <SigmaContainer style={{ height: "1000px", width: "1000px" }}>
                            <LoadGraph />
                        </SigmaContainer>
                     </div>
                 </div>
             </div>
      
    );
  };
 
export default GraphDisplay;