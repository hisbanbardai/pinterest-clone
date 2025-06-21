import { Image } from "@imagekit/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

// const items = [
//   {
//     id: 1,
//     source: "/pins/pin1.jpeg",
//   },
//   {
//     id: 2,
//     source: "/pins/pin2.jpeg",
//   },
//   {
//     id: 3,
//     source: "/pins/pin3.jpeg",
//   },
//   {
//     id: 4,
//     source: "/pins/pin4.jpeg",
//   },
//   {
//     id: 5,
//     source: "/pins/pin5.jpeg",
//   },
//   {
//     id: 6,
//     source: "/pins/pin6.jpeg",
//   },
//   {
//     id: 7,
//     source: "/pins/pin7.jpeg",
//   },
//   {
//     id: 8,
//     source: "/pins/pin8.jpeg",
//   },
//   {
//     id: 9,
//     source: "/pins/pin9.jpeg",
//   },
//   {
//     id: 10,
//     source: "/pins/pin10.jpeg",
//   },
//   {
//     id: 11,
//     source: "/pins/pin11.jpeg",
//   },
//   {
//     id: 12,
//     source: "/pins/pin12.jpeg",
//   },
//   {
//     id: 13,
//     source: "/pins/pin13.jpeg",
//   },
//   {
//     id: 14,
//     source: "/pins/pin14.jpeg",
//   },
//   {
//     id: 15,
//     source: "/pins/pin15.jpeg",
//   },
//   {
//     id: 16,
//     source: "/pins/pin16.jpeg",
//   },
//   {
//     id: 17,
//     source: "/pins/pin17.jpeg",
//   },
//   {
//     id: 18,
//     source: "/pins/pin18.jpeg",
//   },
//   {
//     id: 19,
//     source: "/pins/pin19.jpeg",
//   },
//   {
//     id: 20,
//     source: "/pins/pin20.jpeg",
//   },
// ];

async function fetchPins() {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pins`);
  const { pins } = data;
  return pins;
}

export default function Gallery() {
  // Queries
  const { data, error } = useQuery({ queryKey: ["pins"], queryFn: fetchPins });

  if (error) {
    return "An error occurred: " + error.message;
  }

  return (
    <main className="columns-1 sm:columns-2 md:columns-4 lg:columns-7 px-4">
      {data?.map((item) => <GalleryItem item={item} key={item.id} />)}
    </main>
  );
}

function GalleryItem({ item }) {
  return (
    <div className="rounded-lg mb-5 overflow-hidden cursor-pointer group relative">
      <Link to={`/pin/${item.id}`}>
        <Image
          className="w-full"
          loading="lazy"
          responsive={false}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          src={item.imageUrl}
          transformation={[
            {
              quality: 20,
            },
            {
              width: 372,
            },
          ]}
        />

        <div className="hidden group-hover:flex flex-col items-end justify-between absolute w-full top-0 left-0 bg-black/30 h-full py-3 pr-3 transition-all duration-1000">
          <div>
            <button className="text-white bg-red-600 py-3 px-4 rounded-full font-semibold cursor-pointer">
              Save
            </button>
          </div>

          <div className="flex gap-3">
            <button className="bg-white p-1 rounded-full cursor-pointer">
              <img src="/general/share.svg" alt="share-pin-icon" />
            </button>
            <button className="bg-white p-1 rounded-full cursor-pointer">
              <img src="/general/more.svg" alt="more-options-icon" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
