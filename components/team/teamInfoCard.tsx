"use client";

// Definisikan tipe data untuk properti 'member'
interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
}

interface TeamInfoCardProps {
  member: Member;
  onClose: () => void; // Fungsi untuk menutup card
}

// Gunakan ikon X dari lucide-react untuk tombol close
import { X } from "lucide-react";

export default function TeamInfoCard({ member, onClose }: TeamInfoCardProps) {
  if (!member) return null;

  return (
    <div className="relative bg-transparent backdrop-blur-sm lg:mt-10 p-1 lg:p-3 rounded-lg shadow-lg  lg:w-full h-fit border ">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col items-start h-full">
        <h3 className="text-l lg:text-2xl font-bold text-primary">
          {member.name}
        </h3>
        <p className="text-sm lg:text-md font-semibold text-muted-foreground mb-2">
          {member.title}
        </p>
        <p className="text-xs lg:text-base text-foreground/80 min-line-clamp-2">
          {member.description}
        </p>
      </div>
    </div>
  );
}
