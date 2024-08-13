import React,{useState} from 'react';
import { usePeer } from './PeerContext';

export default function Friends({ setShowFriends }) {

    const {myPeer,connection,setConnection,connectAudio,setRemoteId} = usePeer()

    const [remoteId, setRemote] = useState('');


    const handleConnect = () => {
        if (myPeer) {
            const conn = myPeer.connect(remoteId);
            setConnection(conn)
            setRemoteId(remoteId)
            connectAudio(remoteId)
        } else {
            console.error('Peer is not initialized yet.');
        }
    };

  return (
    <div className='absolute z-10 min-h-[100%] min-w-[30%] bg-white'>
      <div onClick={() => setShowFriends(false)} className="cursor-pointer p-2">
        close
      </div>
      <div>
            <input className="border-2 border-black" onChange={(event) => setRemote(event.target.value)} />
            <button onClick={handleConnect}>Connect</button>
        </div>
    </div>

  );
}
