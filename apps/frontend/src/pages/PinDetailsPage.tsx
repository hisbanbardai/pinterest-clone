import { useParams } from "react-router";
import Pin from "../components/Pin";
import PinContextProvider from "../contexts/PinContextProvider";

export default function PinDetailsPage() {
  const { id } = useParams();

  return (
    <PinContextProvider id={id}>
      <Pin />
    </PinContextProvider>
  );
}
