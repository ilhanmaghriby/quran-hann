import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import frame from "../assets/img/ic-frame.png";

type AyahType = {
  number: number;
  arab: string;
  translation: string;
};

type BismillahType = {
  arab: string;
  translation: string;
};

type DataType = {
  number: number;
  name: string;
  revelation: string;
  numberOfAyahs: number;
  translation: string;
  ayahs: AyahType[];
  bismillah?: BismillahType;
};

const SurahDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    axios.get(`https://quran-api-id.vercel.app/surahs/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <section className="py-20">
      {data !== null ? (
        <>
          <div className="text-center">
            <h1 className="text-xl lg:text-2xl font-bold">
              {data.name}{" "}
              <span className="font-light">({data.translation})</span>
            </h1>
            <h2 className="font-thin text-sm">
              {data.revelation} - {data.numberOfAyahs} ayat
            </h2>
          </div>
          <div className="flex text-arab">
            <div className="w-full">
              <div className="text-center mt-10">
                <h3 className="text-2xl border-2 border-gray-300 rounded-lg mx-4 lg:mx-96 py-4 bg-white">
                  {data.bismillah?.arab}
                </h3>
                <h3 className="mt-4">{data.bismillah?.translation}</h3>
              </div>

              {data.ayahs.map((item: any) => {
                return (
                  <div className="py-10 " key={item.number.inSurah}>
                    <div className="grid surah-grid">
                      <div className="lg:ml-20">
                        <div className="float-left">
                          <div className="pl-5 ">
                            <img src={frame} alt="" className="w-12 h-12" />
                          </div>
                          <p className="relative flex justify-center bottom-9 left-2">
                            {item.number.inSurah}
                          </p>
                        </div>
                      </div>
                      <div className="mr-2 text-arab text-right py-5 pr-5 text-2xl lg:mr-10 bg-white border-2 border-grey-200 rounded-lg ">
                        {item.arab}
                      </div>
                    </div>
                    <div className="lg:mx-44 md:mx-20 mx-6 mt-4 text-center ">
                      <p>{item.translation}</p>
                      <br />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </section>
  );
};

export default SurahDetails;
