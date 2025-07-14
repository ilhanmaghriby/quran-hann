import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import frame from "../assets/img/ic-frame.png";

type AyahType = {
  nomor: number;
  ar: string;
  idn: string;
};

type BismillahType = {
  arab: string;
  translation: string;
};

type DataType = {
  nomor: number;
  nama: string;
  tempat_turun: string;
  jumlah_ayat: number;
  arti: string;
  ayat: AyahType[];
  bismillah?: BismillahType;
};

const SurahDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    axios
      .get(`https://quran-api.santrikoding.com/api/surah/${id}`)
      .then((res) => {
        setData(res.data);
      });
  }, [id]);

  return (
    <section className="py-16">
      {data !== null ? (
        <>
          <div className="text-center mb-4">
            <h1 className="text-xl lg:text-2xl font-bold">
              {data.nama} <span className="font-light">({data.arti})</span>
            </h1>
            <h2 className="font-thin text-sm">
              {data.tempat_turun} - {data.jumlah_ayat} ayat
            </h2>
          </div>
          {/* Verses */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {data.ayat.map((ayah) => (
              <div
                key={ayah.nomor}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 md:p-6">
                  {/* Ayah number and Arabic text */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 relative">
                      <img src={frame} alt="" className="w-10 h-10" />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                        {ayah.nomor}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-right text-2xl md:text-3xl leading-loose text-arab font-arabic">
                        {ayah.ar}
                      </p>
                    </div>
                  </div>

                  {/* Translation */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{ayah.idn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>End of Surah {data.nama}</p>
          </div>
        </>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </section>
  );
};

export default SurahDetails;
