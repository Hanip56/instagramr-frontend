import EmptySection from "./EmptySection";
import { MdOutlinePersonPin } from "react-icons/md";
import { useShownUser } from "../../pages/Profile";

const TaggedSection = () => {
  const { isOwnUser } = useShownUser();

  const tagged = []; // In development

  if (tagged.length < 1) {
    if (isOwnUser) {
      return (
        <EmptySection
          logo={<MdOutlinePersonPin />}
          title="Photos of you"
          desc="When people tag you in photos, they'll appear here"
        />
      );
    } else {
      return (
        <EmptySection logo={<MdOutlinePersonPin />} title="No Photos" desc="" />
      );
    }
  }

  return (
    <main className="w-full grid grid-cols-3 gap-1 py-6 px-0 md:px-2">
      {/* {Array(8)
        .fill("")
        .map((key, idx) => (
          <PostMiniCard key={idx} />
        ))} */}
    </main>
  );
};

export default TaggedSection;
