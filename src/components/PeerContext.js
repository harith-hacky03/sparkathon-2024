// lib/PeerContext.tsx

import React, { createContext, useState, useEffect, useRef} from 'react';
import Peer from 'peerjs';


const PeerContext = createContext(undefined);

export const PeerProvider = ({ children }) => {
    const [myPeer, setMyPeer] = useState(null);
    const [connection, setConnection] = useState(null);
    const [remoteId,setRemoteId] = useState(null)
    const peerInstance = useRef(null);
    const localAudioRef = useRef();
    const remoteAudioRef = useRef();

    
      function mapFunctions(name){
        if(name == 'signIn') console.log(name)
        if(name == 'cart') console.log(name)
      }

      const connectAudio = (id) => {
        console.log(id)
        navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
            localAudioRef.current.srcObject = stream;
            const call = peerInstance.current.call(id, stream);
            call.on('stream', (remoteStream) => {
            remoteAudioRef.current.srcObject = remoteStream;
        });
        })
    }


    useEffect(() => {
        const peer = new Peer();
        peerInstance.current = peer;

        peer.on('open', (id) => {
            setMyPeer(peer);
            console.log('My Peer ID:', id);
        });

        peer.on('connection', (conn) => {
            setConnection(conn);
            console.log('Connected with ', conn.peer);
        });

        peer.on('error', (err) => {
            console.error('PeerJS Error:', err);
        });

        return () => {
            peer.destroy();
        };
    }, []);



    return (
        <PeerContext.Provider value={{ myPeer, connection, setConnection,remoteId,setRemoteId,connectAudio,localAudioRef,remoteAudioRef }}>
            <audio ref={localAudioRef} autoPlay muted></audio>
            <audio ref={remoteAudioRef} autoPlay></audio>
            {children}
        </PeerContext.Provider>
    );
};

export const usePeer = () => {
    const context = React.useContext(PeerContext);
    if (context === undefined) {
        throw new Error('usePeer must be used within a PeerProvider');
    }
    return context;
};
