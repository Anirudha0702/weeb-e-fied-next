import AiringSchedule from "../components/home/AiringSchedule";
import Banner from "../components/home/Banner";
import Genres from "../components/home/Genres";
import Trending from "../components/home/Trending";

function HomePage() {
  return (
    <div className="w-full">
      <Banner />
      <Genres />
      <Trending />
      <AiringSchedule />
    </div>
  );
}

export default HomePage;
