import { useSearchParams } from "react-router";
import Gallery from "../components/Gallery";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const boardId = searchParams.get("boardId");

  return <Gallery userId="" boardId={boardId || ""} />;
}
