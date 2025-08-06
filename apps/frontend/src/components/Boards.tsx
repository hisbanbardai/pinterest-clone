import { Image } from "@imagekit/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

export default function Boards({ userId }: { userId }) {
  const {
    data: { boards },
  } = useQuery({
    queryKey: ["boardsOfUser", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/boards/${userId}`
      );
      return data;
    },
  });

  console.log(boards);

  return (
    <div className="columns-7 px-4">
      {boards.map((board, index) => (
        <Board board={board} key={board.id} />
      ))}
    </div>
  );
}

function Board({ board }) {
  return (
    <div className="mb-8 overflow-hidden">
      <Link to={`/pin/1`}>
        <Image
          className="w-full object-cover rounded-lg"
          loading="lazy"
          responsive={false}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          src={board.pins[0].imageUrl}
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
        <p className="font-semibold">{board.title}</p>
        <p className="text-neutral-500 text-sm">
          {board.pins.length} Pins &middot; 1w
        </p>
      </div>
    </div>
  );
}
