import { useEffect } from "react";
import { useState } from "react";
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


export const GraphDisplay = (props) => {

    const [showGraph, setShowGraph] = useState(true);
  
    const handleGraphClick = () => {
      setShowGraph(true);
    };
  
    const handleListClick = () => {
      setShowGraph(false);
    };
  
    const renderPageContent = () => {
      if (showGraph) {
        return (
          <div className='grid  m-auto bg-slate-500' style={{ height: '100vh', width: "100%" }}>
            <div className='w-full m-0 p-4'>
              <SigmaContainer>
                <LoadGraph />
              </SigmaContainer>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <p>Here implement the list representation</p>
            <div style={{ height: '100vh', width: "100%" }}>
            </div>
          </div>
        );
      }
    };

  return (
    //TBD : change the a beacon?
    <div className="flex flex-wrap items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex-wrap w-full justify-between">
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button className="relative inline-flex items-center rounded-l-md px-2 py-2" onClick={() => setShowGraph(showGraph => !showGraph)}>
            <span className="sr-only">Graph</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>
          <button aria-current={showGraph} className={`${showGraph === true? 'bg-zinc-400' : ''} text-sm font-semibold text-white relative z-10 inline-flex items-center px-4 py-2`} onClick={handleGraphClick}>Graph</button>
          <button aria-current={showGraph} className={`${showGraph === false? 'bg-zinc-400' : ''} text-sm font-semibold text-white relative z-10 inline-flex items-center px-4 py-2`} onClick={handleListClick}>List</button>

          <button className="relative inline-flex items-center rounded-r-md px-2 py-2" onClick={() => setShowGraph(showGraph => !showGraph)}>
            <span className="sr-only">List</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>          
        <div className="m-4">
            {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default GraphDisplay;