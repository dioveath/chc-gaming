import ArenaCard from "../../components/Arena/ArenaCard";
import Button from "../../components/Button";
import ClipViewCard from "../../components/Clips/ClipViewCard";
import Footer from "../../components/Footer";
import TourneyCard from "../../components/Tourneys/TourneyCard";
import ClipCard from "../DashboardPage/Dashboard/ClipsPanel/ClipCard";

export default function HomePage() {
  // get the premium video id from the backend

  return (
    <article className="w-full">
      <div className="relative w-full h-[80%]">
        <video className="absolute top-0 left-0 w-full h-full object-cover -z-10 bg-opacity-90" id="background-video" loop={true} muted={true} autoPlay={true} poster="">
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10">
          <div className="w-[60%] flex flex-col items-center">
            <h2 className="font-bold text-[30px] sm:text-[40px] lg:text-[60px] text-white text-center"> For the World </h2>
            <p className="text-white text-xs sm:text-base text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit doloribus iure amet adipisci! Itaque necessitatibus nisi soluta quod praesentium, vel, doloribus expedita sed
              ducimus libero placeat? Delectus harum autem porro.
            </p>
            <div className="h-4"></div>
            <Button> Join Arena </Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/20 via-secondary/80 to-secondary"></div>
      </div>

      <div className="max-w-[1024px] mx-auto overflow-clip">
        {/* Featured Leagues */}
        <div className="mt-4">
          <h2 className="text-white font-bold text-xl mb-4">Trending Tourneys</h2>
          <div className="flex items-center gap-4 overflow-x-scroll">
            <TourneyCard />
            <TourneyCard />
            <TourneyCard />
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-white font-bold text-xl mb-4">Trending Clips</h2>
          <div className="flex items-center gap-4 overflow-x-scroll p-4">
            <ClipViewCard/>
            <ClipViewCard/>            
            <ClipViewCard/>
          </div>
        </div>

        {/* Featured Arenas */}
        <div className="mt-4">
          <h2 className="text-white font-bold text-xl mb-4">Featured Arenas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
            <ArenaCard/>
            <ArenaCard/>
            <ArenaCard/>                       
            <ArenaCard/>                       
            <ArenaCard/>
            <ArenaCard/>                        
          </div>
        </div>

        {/* Tourneys for you */}
        {/* Ads */}
        {/* Popular Games */}
        {/* Popular Tourneys */}
        {/* Popular Arenas */}
        {/* Ads */}
        {/* Popular Market Listings */}
        {/* Popular Players */}
        {/* Ads */}
        {/* Popular Streamers */}
        {/* Popular Videos */}
        {/* Ads */}
      </div>

      <div className="h-20"></div>

      <Footer />
    </article>
  );
}
