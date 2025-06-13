import VoirMission from "./VoirMission";
import AddMission from "./AddMission";
import Utilities from "./Utilities";
import Events from "./Evenements";

function HomePage() {
    const userType = localStorage.getItem('userType');


  return (
    <div>
    {userType === 'vol' && < VoirMission/>}
    {userType === 'org' && < AddMission/>}
    {userType === 'fan' && < Events/>}

    </div>
  );
}

export default HomePage;
