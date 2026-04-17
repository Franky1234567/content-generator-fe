import { badgeColor } from "@/utils/format";

interface Props {
  type: string;
  className?: string;
}

export default function ContentBadge({ type, className = "" }: Props) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor(type)} ${className}`}>
      {type}
    </span>
  );
}
