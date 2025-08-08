import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import type { TBoard } from "../lib/types";
import { format } from "timeago.js";

export default function Boards({ userId }: { userId: string }) {
  async function fetchUserBoards(userId: string) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/boards/${userId}`
    );

    return response.data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["boardsOfUser", userId],
    queryFn: () => fetchUserBoards(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred {error.message}</p>;
  }

  return data.boards.length ? (
    <div className="columns-7 px-4">
      {data.boards.map((board: TBoard) => (
        <Board board={board} key={board.id} />
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">
      You have not created any board yet!
    </p>
  );
}

function Board({ board }: { board: TBoard }) {
  return (
    <div className="mb-8 overflow-hidden">
      <Link to={board.pins.length ? `/?boardId=${board.id}` : `#`}>
        {/* <Image
          className="w-full object-cover rounded-lg"
          loading="lazy"
          responsive={false}
          src={board.pins[0]?.imageUrl || "/general/no-image.png"}
          transformation={[
            {
              quality: 20,
            },
            {
              width: 372,
            },
          ]}
        /> */}
        <img
          className="object-cover rounded-lg"
          src={board.pins[0]?.imageUrl || "/general/no-image.png"}
          alt="image of first pin from the board"
        />

        <div>
          <p className="font-semibold">{board.title}</p>
          {board.pins.length ? (
            <p className="text-neutral-500 text-sm">
              {board.pins.length} Pins &middot; {format(board.createdAt)}
            </p>
          ) : (
            <p className="text-neutral-500 text-[12px]">There are no pins</p>
          )}

          {/* {board.pins.length === 0 && (
          <p className="text-neutral-500 text-sm">There are no pins</p>
          )} */}
        </div>
      </Link>
    </div>
  );
}
