  "use client"
  import { getLanguageByEnglish } from "@/utils/languages";
  // components/Announcements.tsx
  const Announcements = () => (
    <div className="bg-[#f3e8ff] p-4 shadow-md rounded-md w-full h-full">
      <h3 className="text-lg font-semibold mb-2">{getLanguageByEnglish("Announcements")}</h3>
      <p>{getLanguageByEnglish("Latest announcements will appear here.")}</p>
    </div>
  );
  
  export default Announcements;