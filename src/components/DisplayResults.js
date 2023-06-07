import { useFingerprints } from "../contexts/FingerprintsContext";
import { DisplayGraph } from "./DisplayGraph";

export function DisplayResults() {
    const fingerprints = useFingerprints();

    function renderGraphComponent() {
        if ( fingerprints.length !== 0 ) {

            return (
                <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 w-full h-full'>
                        <DisplayGraph fingerprints={fingerprints} />
                </div>
            )
        }
    };

    return (
        <div id="results" className={`${fingerprints.length === 0 ? "invisible" : "visible"} px-4`} style={{ height: '95vh', width: "100%" }}>
            {renderGraphComponent()}
        </div>        
    );
}