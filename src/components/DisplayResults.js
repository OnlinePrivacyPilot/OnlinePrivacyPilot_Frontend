import { useFingerprints } from "../contexts/FingerprintsContext";
import { DisplayGraph } from "./DisplayGraph";

export const DisplayResults = (props) => {
    const fingerprints = useFingerprints();

    return (
        <div id="results" className={`${fingerprints.length === 0 ? "invisible" : "visible"}  px-4`}>
            <div className='bg-zinc-200 rounded-lg border-2 border-solid border-zinc-300 p-4 flex flex-wrap w-full' style={{ height: '100vh', width: "100%" }}>
                <DisplayGraph fingerprint={fingerprints.at(-1).fingerprint} />
            </div>
        </div>
    );
};