import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Graph from "graphology";
import { SigmaContainer, useSigma, useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useFilters, useFiltersDispatch } from '../contexts/FiltersContext';
import axios from 'axios'

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
          
          if (!matchingNode) {
              nodeDifferences.push(key2);
          }
      }
      return nodeDifferences;

};

export function DisplayGraph({fingerprints}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filters = useFilters();
    const dispatch = useFiltersDispatch();

    const fingerprint = fingerprints.at(-1).fingerprint;
    const nodesCreated = fingerprints.length >= 2 ? findNodeDifferences(fingerprints.at(-2).fingerprint, fingerprints.at(-1).fingerprint) : [];

    const [currentFootprintAttributes, setCurrentFootprintAttributes] = useState(fingerprint.nodes.find(node => node.key === fingerprint.nodes[0].key)?.attributes);
    //this variable is here to handle the case where we click and the same node twice in a row
    const [triggerEffect, setTriggerEffect] = useState(false);
    const [windowOpen, setWindowOpen] = useState(false);
    const [jdmDatabase, setJdmDatabase] = useState([]);
    const [deletionUrl, setDeletionUrl] = useState(null);
    const pattern = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})(?:\/.*)?$/;
    
    useEffect(() => {//Then we collect the data of the db, maybe do it outside of the function at the same time we are doing the request to the API
    const fetchJdmDatabase = async () => {
    try {
        const response = await axios.get(
        'https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json'
        );
        setJdmDatabase(response.data);
    } catch (error) {
        console.error('Error fetching sites data:', error);
    }
    };

    fetchJdmDatabase();
    }, []);

    const collectDeletionLink = (domain) => {
        if(domain) {
            const obj = jdmDatabase.find((site) =>    
                site.domains.includes(domain[1])
            );
            // Perform the redirection if deletionUrl is not null
            if (obj) {
                setDeletionUrl(obj.url);
            } else {
                console.log("No matching object found for the domain:", domain[1]);
            } 
        }  
    };

    const handleClick = () => {
        if (deletionUrl && windowOpen === false) {
           // Redirects to the deletion URL
          setWindowOpen(true)
          window.open(deletionUrl, "_blank")
        }
    };

    useEffect(() => {
        if (
            currentFootprintAttributes &&
            (
                currentFootprintAttributes.target_type === 'url' ||
                currentFootprintAttributes.target_type === 'has_account'
            ) &&
            currentFootprintAttributes.target.match(pattern) !== null
        ) {
            collectDeletionLink(currentFootprintAttributes.target.match(pattern))
        } else {
            setDeletionUrl(null);   
        }
        // Reset the trigger to false after the effect runs
        setTriggerEffect(false);
    }, [currentFootprintAttributes, triggerEffect]);
    
    
    function closeModal() {
        setDeletionUrl(null);
        setIsModalOpen(false);
        setWindowOpen(false);
    }
    
    function openModal(FootprintID) {
        setCurrentFootprintAttributes(fingerprint.nodes.find(node => node.key === FootprintID)?.attributes);
        setTriggerEffect(true);
        setIsModalOpen(true);
    }
      

    function setAsFilter(positive) {
        dispatch({
            op: 'add',
            id: filters.length,
            value: currentFootprintAttributes.target,
            type: currentFootprintAttributes.target_type,
            method: currentFootprintAttributes.method,
            positive: positive
        });
    }

    function ForceAtlas2Graph() {
        const sigma = useSigma();
        const { positions, assign } = useLayoutForceAtlas2();
        const loadGraph = useLoadGraph();

        useEffect(() => {
        // Create the graph
        const graph = Graph.from(fingerprint);
        const nbNodes = fingerprint.nodes.length;
        graph.nodes().forEach((node, i) => {
        i === 0 ?  graph.setNodeAttribute(node, "size", 25) : graph.setNodeAttribute(node, "size", 15);

        if (nodesCreated.length > 0 && nodesCreated.includes(node)) {
            graph.setNodeAttribute(node, "x", i);
            graph.setNodeAttribute(node, "y", nbNodes-i);
            graph.setNodeAttribute(node, "color", "#ee1d23");

        }
        else {
            graph.setNodeAttribute(node, "x", i);
            graph.setNodeAttribute(node, "y", nbNodes-i);
        }
            
        });

        loadGraph(graph);
        assign();
        }, [assign, loadGraph]);

        return null;
    };

    function GraphEvents() {
        const registerEvents = useRegisterEvents();

        useEffect(() => {
            // Register the events
            registerEvents({
                // node events
                clickNode: (event) => {
                    openModal(event.node)
                }
            });
        }, [registerEvents]);
        return null;
    };

    return (
        <>
            <SigmaContainer>
                <ForceAtlas2Graph />
                <GraphEvents />
            </SigmaContainer>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />   
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 truncate"
                            >
                                Footprint: {' '}
                                    {(currentFootprintAttributes.target_type === 'url' || currentFootprintAttributes.target_type === 'has_account') && currentFootprintAttributes.target.match(pattern) ? (
                                    <a href={currentFootprintAttributes.target} className="text-blue-500 hover:underline" target="_blank">{currentFootprintAttributes.target}</a>
                                    ) : (
                                    <span>{currentFootprintAttributes.target}</span>
                                    )}
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Type : {currentFootprintAttributes.target_type}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Method: {currentFootprintAttributes.method}
                                </p>
                            </div>

                            <div className="flex flex-wrap mt-4 gap-2">
                                <div
                                className="flex-grow text-center rounded-md border border-transparent bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900"
                                onClick={closeModal}
                                >
                                    Close
                                </div>
                                {(currentFootprintAttributes.target_type !== 'has_account') &&(
                                <>
                                    <div
                                    className="flex-grow text-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900"
                                    onClick={() => {setAsFilter(1); closeModal();}}
                                    >
                                        Mark as relevant
                                    </div>
                                    <div
                                    className="flex-grow text-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900"
                                    onClick={() => {setAsFilter(0); closeModal();}}
                                    >
                                        Mark as irrelevant
                                    </div>
                                </>
                                )}
                                {(currentFootprintAttributes.target_type === 'url' || currentFootprintAttributes.target_type === 'has_account') && deletionUrl &&(
                                <>
                                    <div 
                                    className="basis-full justify-center rounded-md border border-transparent mt-4 bg-blue-200 px-4 py-2 text-sm text-center font-medium text-blue-900"
                                    onClick={handleClick}
                                    >
                                        Remove my data
                                    </div>
                                    <span className="italic text-gray-500">Deletion process provided by{' '}
                                        <a 
                                        href="https://justdeleteme.xyz/"
                                        className="text-blue-500 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >
                                            JustDeleteMe
                                        </a>
                                    </span>
                                </>
                                )}
                            </div>                               
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

