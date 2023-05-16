import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useSigma, useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/react-sigma.min.css";

export const DisplayGraph = ({fingerprint}) => {
    function ForceAtlas2Graph() {
      const sigma = useSigma();
      const { positions, assign } = useLayoutForceAtlas2();
      const loadGraph = useLoadGraph();
  
      useEffect(() => {
        // Create the graph
        const graph = Graph.from(fingerprint);
        const nbNodes = fingerprint.nodes.length;
        graph.nodes().forEach((node, i) => {
          graph.setNodeAttribute(node, "x", i);
          graph.setNodeAttribute(node, "y", nbNodes-i);
          graph.setNodeAttribute(node, "size", 15);
        });
  
        loadGraph(graph);
        assign();
        console.log(positions());
      }, [assign, loadGraph]);
  
      return null;
    };

    return (
      <SigmaContainer>
        <ForceAtlas2Graph />
      </SigmaContainer>
    );
};