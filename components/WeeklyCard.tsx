import Cloud from "@/assets/Cloud";
import Humidity from "@/assets/Humidity";
import Temp from "@/assets/Temp";
import Wind from "@/assets/Wind";
import React from "react";
import { getDayNameFromDate } from "../utils/date";

interface WeeklyCardProps {
  data: any;
}

const WeeklyCard: React.FC<WeeklyCardProps> = ({ data }) => {
  return (
    <div className="flex h-fit cursor-pointer flex-col sm:flex-row bg-white shadow-lg py-4 px-9 rounded-lg justify-between items-center gap-10 flex-wrap">
      <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-fit sm:justify-center gap-2">
        <p className="font-semibold">{getDayNameFromDate(data?.date)}</p>
        <p className="flex items-center">
          <img
            src={`/icons/${data?.icon}`}
            alt="icon"
            className="w-12 mr-1 invert"
          />
          {data?.description}
        </p>
      </div>
      <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-fit sm:justify-center gap-3">
        <div className="flex items-center gap-2">
          <Temp />
          <p className="whitespace-nowrap">{data?.temp} °C</p>
        </div>
        <div className="flex items-center gap-2">
          <Cloud />
          <p className="whitespace-nowrap"> {data?.clouds} %</p>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-fit sm:justify-center gap-2">
        <div className="flex items-center gap-2">
          <Wind />
          {data?.wind} %
        </div>
        <div className="flex items-center gap-2">
          <Humidity />
          {data?.humidity} %
        </div>
      </div>
    </div>
  );
};

export default WeeklyCard;
