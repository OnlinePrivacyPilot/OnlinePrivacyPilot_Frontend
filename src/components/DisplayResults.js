import { useFingerprints } from "../contexts/FingerprintsContext";
import { DisplayGraph } from "./DisplayGraph";

export function DisplayResults() {
    const fingerprints = useFingerprints();

    function findNodeDifferences(json1, json2) {
      //We assume here that JSON2 is the most recent one
        const nodes1 = json1.nodes;
        const nodes2 = json2.nodes;
      
        const nodeDifferences = [];
      
        //nodes second JSON
        for (let i = 0; i < nodes2.length; i++) {
            const node2 = nodes2[i];
            const key2 = node2.key;
            
            const matchingNode = nodes1.find((node1) => node1.key === key2);
            // console.log(matchingNode)
            
            if (!matchingNode) {
                nodeDifferences.push(key2);
            }
        }
        return nodeDifferences;

    };

    function renderGraphComponent() {
        if ( fingerprints.length === 1 ) {
            return (
                <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 w-full h-full'>
                    <DisplayGraph fingerprint={fingerprints.at(-1).fingerprint} nodesCreated={[]} />
                </div>
            );
        } else if ( fingerprints.length >= 2 ) {
            return (
                <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 w-full h-full'>
                    <DisplayGraph fingerprint={fingerprints.at(-1).fingerprint} nodesCreated={findNodeDifferences(fingerprints.at(-2).fingerprint, fingerprints.at(-1).fingerprint)} />
                </div>
            )
        } else {
            return (
              <></>
            )
        }
    }
    return (
        <div id="results" className={`${fingerprints.length === 0 ? "invisible" : "visible"} px-4`} style={{ height: '95vh', width: "100%" }}>
            {renderGraphComponent()}
        </div>
    );
};