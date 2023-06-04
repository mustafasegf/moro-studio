import Image from "next/image";
import { BsInstagram } from "react-icons/bs";

export function Footer() {
  return (
        <footer className="footer bg-dark-grey md:grid-cols-4 p-8 text-base-content">
          <div className="md:ml-20">
            <Image
              className="block w-auto"
              src="/Logo Moro Teks Putih.png"
              alt="Logo Morostudio"
              width={100}
              height={100}
            />
          </div>
          <div className="mr-5 md:mt-3">
            <span className="font-bold text-white-grey">
              Moro Studio Jogja
            </span>
            <p className="text-white-grey">
              Jl. Demangan Baru, Mrican, Caturtunggal, Kec. Depok, Kabupaten
              Sleman, Daerah Istimewa Yogyakarta 55281
            </p>
          </div>
          <div className="mr-5 md:mt-3">
            <span className="font-bold text-white-grey">
              Moro Studio Solo
            </span>
            <p className="text-white-grey">
              CQQQ+W86, Pajang, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57146
            </p>
          </div>
          <div className="md:mt-8 flex items-center">
            <BsInstagram className="text-2xl text-white-grey"/>
            <span className="text-white-grey">morostudio.id</span>
          </div>
        </footer>
  );
}
