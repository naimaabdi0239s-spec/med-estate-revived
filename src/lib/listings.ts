import prop1 from "@/assets/prop1.jpg";
import prop2 from "@/assets/prop2.jpg";
import prop3 from "@/assets/prop3.jpg";
import prop4 from "@/assets/prop4.jpg";
import gal5 from "@/assets/gal5.jpg";

export type Listing = {
  no: string;
  name: string;
  area: string;
  emirate: "Dubai" | "Abu Dhabi" | "Ras Al Khaimah";
  types: ("Villa" | "Apartment" | "Beachfront")[];
  beds: number;
  baths: number;
  sqft: string;
  price: number;
  img: string;
  href?: string;
};

export const listings: Listing[] = [
  { no: "01", name: "Villa Azzurra", area: "Palm Jumeirah", emirate: "Dubai", types: ["Villa", "Beachfront"], beds: 6, baths: 7, sqft: "12,400", price: 42500000, img: prop1, href: "/property/palm-villa" },
  { no: "02", name: "Marina Penthouse", area: "Dubai Marina", emirate: "Dubai", types: ["Apartment"], beds: 3, baths: 4, sqft: "4,100", price: 11800000, img: prop2 },
  { no: "03", name: "Casa del Patio", area: "Saadiyat Island", emirate: "Abu Dhabi", types: ["Villa"], beds: 4, baths: 5, sqft: "5,600", price: 8200000, img: prop3 },
  { no: "04", name: "Palm Grove House", area: "Al Barari", emirate: "Dubai", types: ["Villa"], beds: 5, baths: 6, sqft: "8,900", price: 17400000, img: prop4 },
  { no: "05", name: "Hayat Cove", area: "Al Hamra", emirate: "Ras Al Khaimah", types: ["Villa", "Beachfront"], beds: 4, baths: 4, sqft: "5,200", price: 9600000, img: gal5 },
];

export const formatAED = (n: number) => `AED ${n.toLocaleString("en-US")}`;
