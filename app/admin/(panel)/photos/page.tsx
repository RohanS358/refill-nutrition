import { allPhotos, photos, type PhotoSlot } from "@/lib/photos";
import { PhotosEditor } from "@/components/cms/photos-editor";

/** Where each slot appears — shown as the card title in the editor. */
const labels: Record<PhotoSlot, string> = {
  toddlersInRed: "Hero — portrait 3",
  grandmotherSmiling: "Hero — portrait 1",
  womanSmiling: "Hero — portrait 2",
  grandfatherSmiling: "Hero — portrait 4",
  clinician: "Banner — critical care (large)",
  elderSmiling: "Banner — kidney care",
  dalBhat: "Banner — diabetes",
  girlSmiling: "Banner — little ones",
  familyTable: "Full-screen scroll photo",
  motherBaby: "Moments — large tile",
  fatherAndDaughter: "Moments — tall tile",
  foodSpread: "Moments — food tile",
  boySmiling: "Moments — small tile",
  motherCooking: "Moments — wide tile",
};

export default async function AdminPhotosPage() {
  const current = await allPhotos();
  const slots = (Object.keys(labels) as PhotoSlot[]).map((slot) => ({
    slot,
    label: labels[slot],
    photo: current[slot],
  }));

  return (
    <div className="mx-auto max-w-5xl px-8 py-12 lg:px-12">
      <p className="text-eyebrow text-primary">Photos</p>
      <h1 className="text-display mt-4">Site photography.</h1>
      <p className="text-lead mt-4 max-w-2xl text-muted-foreground">
        Every lifestyle photo on the home page. Upload your own (PNG, JPG or WebP, max 2 MB) or
        paste any image URL. Reset brings back the original.
      </p>
      <PhotosEditor slots={slots} defaults={photos} />
    </div>
  );
}
