const items = [
  {
    id: 1,
    source: "/pins/pin1.jpeg",
  },
  {
    id: 2,
    source: "/pins/pin2.jpeg",
  },
  {
    id: 3,
    source: "/pins/pin3.jpeg",
  },
  {
    id: 4,
    source: "/pins/pin4.jpeg",
  },
  {
    id: 5,
    source: "/pins/pin5.jpeg",
  },
  {
    id: 6,
    source: "/pins/pin6.jpeg",
  },
  {
    id: 7,
    source: "/pins/pin7.jpeg",
  },
  {
    id: 8,
    source: "/pins/pin8.jpeg",
  },
  {
    id: 9,
    source: "/pins/pin9.jpeg",
  },
  {
    id: 10,
    source: "/pins/pin10.jpeg",
  },
  {
    id: 11,
    source: "/pins/pin11.jpeg",
  },
  {
    id: 12,
    source: "/pins/pin12.jpeg",
  },
  {
    id: 13,
    source: "/pins/pin13.jpeg",
  },
  {
    id: 14,
    source: "/pins/pin14.jpeg",
  },
  {
    id: 15,
    source: "/pins/pin15.jpeg",
  },
  {
    id: 16,
    source: "/pins/pin16.jpeg",
  },
  {
    id: 17,
    source: "/pins/pin17.jpeg",
  },
  {
    id: 18,
    source: "/pins/pin18.jpeg",
  },
  {
    id: 19,
    source: "/pins/pin19.jpeg",
  },
  {
    id: 20,
    source: "/pins/pin20.jpeg",
  },
];

export default function Gallery() {
  return (
    <main className="columns-1 sm:columns-2 md:columns-4 lg:columns-6">
      {items.map((item) => (
        <GalleryItem item={item} key={item.id} />
      ))}
    </main>
  );
}

function GalleryItem({ item }) {
  return (
    <div className="rounded-lg mb-5 overflow-hidden">
      <img src={item.source} />
    </div>
  );
}
