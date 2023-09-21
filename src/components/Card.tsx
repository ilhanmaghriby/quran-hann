import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import frame from "../assets/img/ic-frame.png";

type DataType = {
  id: number;
  number: number;
  name: string;
  translation: string;
  revelation: string;
  numberOfAyahs: number;
};

const CardProps = {
  search: "",
};

const Card = ({ search }: typeof CardProps) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios.get("https://quran-api-id.vercel.app/surahs").then((res) => {
      setData(res.data);
    });
  }, []);

  const upperCaseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-10">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-4/5 w-full mx-2">
          {data.length > 0 ? (
            filteredData.map((item, index) => {
              return (
                <Link
                  to={`/surah/${item.number}`}
                  className="border-solid border-2 border-gray-300  rounded-lg bg-white hover:shadow-lg hover:bg-neutral-100"
                >
                  <div key={index}>
                    <div className="float-left">
                      <div className=" pt-4 pl-5 ">
                        <img src={frame} alt="" className="w-12 h-12" />
                      </div>
                      <p className="relative flex justify-center bottom-9 left-2.5">
                        {item.number}
                      </p>
                    </div>
                    <div className="text-center pt-5 pr-5">
                      <div className="flex justify-center">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="font-light">&nbsp;({item.translation})</p>
                      </div>
                      <p className="font-thin text-xs">
                        {upperCaseFirstLetter(item.revelation)} -{" "}
                        {item.numberOfAyahs} Ayat
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center lg:absolute lg:left-1/2">Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
