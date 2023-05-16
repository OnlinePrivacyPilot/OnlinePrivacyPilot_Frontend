import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Graph from "graphology";
import { SigmaContainer, useSigma, useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useFilters, useFiltersDispatch } from '../contexts/FiltersContext';

export function DisplayGraph({fingerprint}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFootprint, setCurrentFootprint] = useState(0);
    const filters = useFilters();
    const dispatch = useFiltersDispatch();


    function closeModal() {
        setIsModalOpen(false);
    }
  
    function openModal(FootprintID) {
        setCurrentFootprint(FootprintID);
        setIsModalOpen(true);
    }

    function setAsFilter(positive) {
        dispatch({
            op: 'add',
            id: filters.length,
            value: fingerprint.nodes.at(currentFootprint).attributes.target,
            type: fingerprint.nodes.at(currentFootprint).attributes.target_type,
            method: fingerprint.nodes.at(currentFootprint).attributes.method,
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
            graph.setNodeAttribute(node, "x", i);
            graph.setNodeAttribute(node, "y", nbNodes-i);
            graph.setNodeAttribute(node, "size", 15);
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
                clickNode: (event) => openModal(event.node)
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Footprint : {fingerprint.nodes.at(currentFootprint).attributes.target}
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Type : {fingerprint.nodes.at(currentFootprint).attributes.target_type}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Method : {fingerprint.nodes.at(currentFootprint).attributes.method}
                                </p>
                            </div>

                            <div className="mt-4 space-x-2">
                                <div
                                className="inline-flex justify-center rounded-md border border-transparent bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900"
                                onClick={closeModal}
                                >
                                    Close
                                </div>
                                <div
                                className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900"
                                onClick={() => {setAsFilter(1); closeModal();}}
                                >
                                    Mark as relevant
                                </div>
                                <div
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900"
                                onClick={() => {setAsFilter(0); closeModal();}}
                                >
                                    Mark as irrelevant
                                </div>
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

