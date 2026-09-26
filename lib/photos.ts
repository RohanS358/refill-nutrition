// Lifestyle photography — free-licence Unsplash images served (and resized)
// by their CDN, rendered with plain <img>. Every slot can be replaced from
// the admin (Content studio → Photos) with an upload or any image URL.

import { collection } from "@/lib/cms/content";

/** `id` is an Unsplash photo id ("photo-…") or a full/relative image URL. */
export type Photo = { id: string; alt: string };

const isUnsplash = (id: string) => id.startsWith("photo-") || id.startsWith("flagged/");

/** Unsplash CDN url, cropped and resized on their side; other URLs pass through. */
export const unsplash = (id: string, w = 800, h?: number) =>
  isUnsplash(id)
    ? `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ""}`
    : id;

/** 1x/2x srcset for a fixed-size slot (undefined for non-Unsplash images). */
export const unsplashSet = (id: string, w: number, h?: number) =>
  isUnsplash(id) ? `${unsplash(id, w, h)} 1x, ${unsplash(id, w * 2, h && h * 2)} 2x` : undefined;

// Every photo below was checked against its Unsplash location record: all
// were taken in Nepal.
export const photos = {
  toddlersInRed: { id: "photo-1517351313798-6f674000e4aa", alt: "Three young sisters in red dresses, Kathmandu" },
  fatherAndDaughter: { id: "photo-1603367563698-67012943fd67", alt: "A father lifting his laughing daughter, Butwal" },
  grandmotherSmiling: { id: "photo-1785771073572-9432c16a8910", alt: "A grandmother in traditional dress smiling, Lalitpur" },
  womanSmiling: { id: "photo-1658288098101-84f074c292a8", alt: "A woman laughing warmly, Mustang" },
  grandfatherSmiling: { id: "photo-1763479168262-509a40bd0479", alt: "A smiling grandfather in a knitted hat, Imadol" },
  elderSmiling: { id: "photo-1747118431411-bd9c30cb880c", alt: "An older man smiling outside his home, Kathmandu" },
  clinician: { id: "photo-1599318524598-6274dfab44ec", alt: "A clinician in scrubs at work in a Kathmandu lab" },
  dalBhat: { id: "photo-1588644525273-f37b60d78512", alt: "A plate of dal bhat with vegetables, Kathmandu" },
  foodSpread: { id: "photo-1595917248955-a96ace4780b6", alt: "Home-cooked Nepali dishes on the table, Kathmandu" },
  girlSmiling: { id: "photo-1667278153546-99b944439112", alt: "A young girl smiling, Butwal" },
  familyTable: { id: "photo-1643641438254-01ae1764aa8a", alt: "A father and his child at the table, Kathmandu" },
  motherCooking: { id: "photo-1543860856-79e478a9452b", alt: "A mother cooking while holding her child, Kathmandu" },
  motherBaby: { id: "photo-1547106254-ab97c6dea9ce", alt: "A smiling mother carrying her baby, Syabru Besi" },
  boySmiling: { id: "photo-1770904336762-6ff2ecdab4d1", alt: "A boy with a tika smiling, Kathmandu" },
} satisfies Record<string, Photo>;

export type PhotoSlot = keyof typeof photos;

/** Every photo slot with admin overrides applied. */
export async function allPhotos(): Promise<Record<PhotoSlot, Photo>> {
  const overrides = await collection<Partial<Record<PhotoSlot, Photo>>>("photos", {});
  return Object.fromEntries(
    (Object.keys(photos) as PhotoSlot[]).map((k) => [k, { ...photos[k], ...overrides[k] }]),
  ) as Record<PhotoSlot, Photo>;
}

/** One photo slot with its admin override applied. */
export async function photo(slot: PhotoSlot): Promise<Photo> {
  return (await allPhotos())[slot];
}
