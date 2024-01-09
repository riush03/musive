

import ScrollContainer from "react-indiana-drag-scroll";


import HorizontalTrackCard from "./HorizontalTrackCard";
function HorizontalTracksList() {


  return (
    <ScrollContainer
      vertical={false}
      horizontal={true}
      className="flex flex-row"
    >
      <div className="mx-4 mobile:mx-2 tablet:mx-6"></div>
        <HorizontalTrackCard/>
    </ScrollContainer>
  );
}

export default HorizontalTracksList;
