import React,{useState} from 'react';
import { usePeer } from './PeerContext';

export default function Friends({ setShowFriends }) {

    const {myPeer,connection,setConnection,connectAudio,setRemoteId} = usePeer()

    const [remoteId, setRemote] = useState('');

    const friendsArray = [
      {
        name:"John",
        img:"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
      },
      {
        name:"Peter",
        img:"https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg"
      },
      {
        name:"Mom",
        img:"https://sarahclaysocial.com/wp-content/uploads/2020/10/sarah-clay-3.jpg",
      },
      {
        name:"Sister",
        img:"https://media.istockphoto.com/id/1305462732/photo/headshot-studio-portrait-of-a-woman-in-profile-looking-at-the-camera.webp?b=1&s=170667a&w=0&k=20&c=0AXRV3wA2u6gi3ccQcnQ4ISs7m-WMk3icBA6IlLwH34=",
      },{
        name:"Daddy",
        img:"https://thumbs.dreamstime.com/b/webcam-view-mature-experienced-businessman-boss-talking-to-colleagues-partners-remotely-gray-haired-man-looking-camera-smiling-319458795.jpg"
      }
    ]

    const RequestArray = [
      {
        name:"Julie",
        img:"https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
      }
    ]


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
    <div className='absolute z-10 min-h-[100%] min-w-[30%] bg-white p-[20px]'>
      <div onClick={() => setShowFriends(false)} className="cursor-pointer p-2">
        close
      </div>
      <div>
            <input className="border-2 border-black" onChange={(event) => setRemote(event.target.value)} />
            <button onClick={handleConnect}>Connect</button>
        </div>
        <div className='text-2xl font-bold'>Friends</div>
        {
          friendsArray.map((fr)=>{
            return(
              <div className='mt-5'>
                <div className='border-2 bg-[#0071dc] text-white  rounded-lg flex text-center items-center'>
                    <img width={60} src={fr.img}/>
                    <div className='ml-[20%]'>{fr.name}</div>
                    <div className='ml-[20%] text-black text-[12px] cursor-pointer bg-[#FFBF00] px-[5px] rounded-lg'>Connect</div>
                </div>
              </div>
            );
          })
        }
        <div>
          <div className='text-2xl font-bold mt-[20px]'>Requests</div>
          <div>
          <div className='mt-5'>
                <div className='border-2 bg-[#0071dc] text-white  rounded-lg flex text-center items-center'>
                    <img width={60} src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"/>
                    <div className='ml-[20%]'>Julie</div>
                    <div className='ml-[20%] text-black text-[12px] cursor-pointer bg-[#FFBF00] px-[5px] rounded-lg'>Accept</div>
                </div>
              </div>
          </div>
        </div>
    </div>

  );
}
