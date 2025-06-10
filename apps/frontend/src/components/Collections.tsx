import { Image } from "@imagekit/react";
import { Link } from "react-router";

export default function Collections() {
  return (
    <div className="columns-7 px-4">
      {Array.from({ length: 14 }).map(() => (
        <Collection />
      ))}
    </div>
  );
}

function Collection() {
  return (
    <div className="mb-8 overflow-hidden">
      <Link to={`/pin/1`}>
        <Image
          className="w-full object-cover rounded-lg"
          loading="lazy"
          responsive={false}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          src={"/pins/pin2.jpeg"}
          transformation={[
            {
              quality: 20,
            },
            {
              width: 372,
            },
          ]}
        />
      </Link>

      <div>
        <p className="font-semibold">Minimalist Bedrooms</p>
        <p className="text-neutral-500 text-sm">12 Pins &middot; 1w</p>
      </div>
    </div>
  );
}
