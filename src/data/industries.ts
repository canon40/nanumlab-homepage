import { Building2, FileText, Landmark, MapPin, Satellite, Ticket } from "lucide-react";

export const industries = [
  { icon: Building2, label: "공공·지자체", path: "/solutions#smart-ticket", image: "/images/solutions/smart-ticket.svg" },
  { icon: Ticket, label: "관광·문화", path: "/solutions#xr", image: "/images/solutions/xr.svg" },
  { icon: FileText, label: "행정·민원", path: "/solutions#callcenter", image: "/images/solutions/callcenter.svg" },
  { icon: MapPin, label: "지역상권", path: "/solutions#local", image: "/images/solutions/local.svg" },
  { icon: Satellite, label: "공공데이터", path: "/solutions#geo", image: "/images/solutions/geo.svg" },
  { icon: Landmark, label: "XR·공간정보", path: "/solutions#xr", image: "/images/solutions/xr.svg" },
] as const;
