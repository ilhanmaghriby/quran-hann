import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import frame from "../assets/img/ic-frame.png";

// Tipe data sesuai API baru
type SurahType = {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
};

// Props untuk komponen Card
type CardProps = {
  search: string;
};

const Card = ({ search }: CardProps) => {
  const [data, setData] = useState<SurahType[]>([]);

  useEffect(() => {
    axios
      .get("https://quran-api.santrikoding.com/api/surah")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, []);

  const upperCaseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredData = data.filter((item) =>
    item.nama_latin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-10">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-4/5 w-full mx-2">
          {data.length > 0 ? (
            filteredData.map((item, index) => (
              <Link
                to={`/surah/${item.nomor}`}
                key={index}
                className="border-2 border-gray-300 rounded-lg bg-white hover:shadow-lg hover:bg-neutral-100"
              >
                <div>
                  <div className="float-left">
                    <div className="pt-4 pl-5">
                      <img src={frame} alt="" className="w-12 h-12" />
                    </div>
                    <p className="relative flex justify-center bottom-9 left-2.5">
                      {item.nomor}
                    </p>
                  </div>
                  <div className="text-center pt-5 pr-5">
                    <div className="flex justify-center flex-wrap">
                      <h4 className="font-bold">{item.nama}</h4>
                      <p className="font-light">&nbsp;({item.nama_latin})</p>
                    </div>
                    <p className="font-thin text-xs">
                      {upperCaseFirstLetter(item.tempat_turun)} -{" "}
                      {item.jumlah_ayat} Ayat
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center lg:absolute lg:left-1/2">Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
