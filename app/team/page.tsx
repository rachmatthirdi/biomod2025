"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import TeamInfoCard from "@/components/team/teamInfoCard";
import { useNavbar } from "@/app/context/NavbarContext";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";

// --- REFACTOR: Custom hook for responsive layout ---
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    // Check on initial mount
    checkSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return { isMobile };
};

// --- Interface ---
interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
}

// --- REFACTOR: Consolidated layout configurations ---
const layoutConfig = {
  desktop: {
    pyramidPositions: [
      { x: "-32.5%", y: "-85%" },
      { x: "5%", y: "-70%" },
      { x: "-70%", y: "-70%" },
      { x: "40%", y: "-50%" },
      { x: "-32.5%", y: "-50%" },
      { x: "-105%", y: "-50%" },
      { x: "75%", y: "-30%" },
      { x: "2.5%", y: "-30%" },
      { x: "-70%", y: "-30%" },
      { x: "-140%", y: "-30%" },
    ],
    listPositions: [
      { x: "5%", y: "-40%" },
      { x: "-45%", y: "-40%" },
      { x: "-95%", y: "-40%" },
      { x: "-175%", y: "60%" },
      { x: "-125%", y: "60%" },
      { x: "-75%", y: "60%" },
      { x: "75%", y: "60%" },
      { x: "25%", y: "60%" },
      { x: "-20%", y: "160%" },
      { x: "-70%", y: "160%" },
    ],
    groupTitlePositions: {
      leads: { x: "-40%", y: "-1200%" },
      ai: { x: "-310%", y: "100%" },
      data: { x: "240%", y: "100%" },
      ux: { x: "-45%", y: "1400%" },
    },
  },
  mobile: {
    pyramidPositions: [
      { x: "-95%", y: "-80%" },
      { x: "-40%", y: "-100%" },
      { x: "15%", y: "-80%" },
      { x: "-70%", y: "-30%" },
      { x: "-10%", y: "-30%" },
      { x: "-100%", y: "20%" },
      { x: "-40%", y: "20%" },
      { x: "20%", y: "20%" },
      { x: "-70%", y: "70%" },
      { x: "-10%", y: "70%" },
    ],
    listPositions: [
      { x: "20%", y: "-80%" },
      { x: "-45%", y: "-90%" },
      { x: "-110%", y: "-80%" },
      { x: "-100%", y: "20%" },
      { x: "-45%", y: "20%" },
      { x: "10%", y: "20%" },
      { x: "-15%", y: "120%" },
      { x: "-75%", y: "120%" },
      { x: "5%", y: "220%" },
      { x: "-95%", y: "220%" },
    ],
    groupTitlePositions: {
      leads: { x: "-15%", y: "-1200%" },
      ai: { x: "-15%", y: "500%" },
      data: { x: "-15%", y: "2000%" },
      ux: { x: "-15%", y: "3500%" },
    },
  },
};

const UKURAN_AKHIR_GAMBAR_SECTION_2 = 0.7;

// --- REFACTOR: Single source for group title data ---
const groupTitlesData = [
  {
    id: "leads",
    text: "Research Leads",
    positionKey: "leads",
    verticalOnDesktop: false,
  },
  {
    id: "ai",
    text: "AI Specialists",
    positionKey: "ai",
    verticalOnDesktop: "rl",
  },
  {
    id: "data",
    text: "Data Engineers",
    positionKey: "data",
    verticalOnDesktop: "lr",
  },
  {
    id: "ux",
    text: "UX Researchers",
    positionKey: "ux",
    verticalOnDesktop: false,
  },
];

// --- Komponen Pintar: TransformingMember ---
interface TransformingMemberProps {
  member: Member;
  index: number;
  scrollYProgress: MotionValue<number>;
  isSelected: boolean;
  isAnyMemberSelected: boolean;
  isHovered: boolean;
  isAnyMemberHovered: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClick: () => void;
  // REFACTOR: Pass positions directly
  startPosition: { x: string; y: string };
  endPosition: { x: string; y: string };
}

function TransformingMember({
  member,
  scrollYProgress,
  isSelected,
  isAnyMemberSelected,
  isHovered,
  isAnyMemberHovered,
  onPointerEnter,
  onPointerLeave,
  onClick,
  startPosition, // Received from parent
  endPosition, // Received from parent
}: TransformingMemberProps) {
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [startPosition.x, endPosition.x]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [startPosition.y, endPosition.y]
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, UKURAN_AKHIR_GAMBAR_SECTION_2]
  );
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  const [isInteractive, setIsInteractive] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // REFACTOR: Simplified logic
    setIsInteractive(latest < 0.5);
    setTextVisible(latest >= 0.5);
  });

  const isHidden = isInteractive && isAnyMemberSelected && !isSelected;
  const shouldBlur =
    isInteractive &&
    ((isAnyMemberSelected && !isSelected) ||
      (!isAnyMemberSelected && isAnyMemberHovered && !isHovered));
  const isActuallySelected = isSelected && isInteractive;

  return (
    <motion.div
      initial={false}
      animate={{
        x: isActuallySelected ? "-180px" : x.get(),
        y: isActuallySelected ? "-50%" : y.get(),
        opacity: isHidden ? 0 : 1,
        filter: shouldBlur ? "blur(8px)" : "blur(0px)",
        zIndex: isActuallySelected ? 40 : isHovered ? 30 : 10,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute top-1/3 left-1/2"
    >
      <motion.figure
        className="relative w-[20vh] lg:w-[400px] aspect-square flex-shrink-0 overflow-hidden cursor-pointer"
        style={{
          borderRadius,
          scale: scrollScale,
          pointerEvents: isInteractive ? "auto" : "none",
        }}
        animate={{
          scale: isActuallySelected ? 0.85 : isHovered ? 1.05 : 1,
          borderRadius: isActuallySelected ? "8px" : "0%",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={() => isInteractive && onClick()}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top w-max"
        />
      </motion.figure>

      <AnimatePresence>
        {textVisible && !isAnyMemberSelected && (
          <motion.div
            className="text-center mt-[-20%]"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-xs lg:text-lg mt-2 lg:mt-5">
              {member.name}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- KOMPONEN UTAMA HALAMAN ---
export default function TeamPage() {
  const { isMobile } = useResponsiveLayout();
  const [teamData, setTeamData] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);

  // REFACTOR: Select the correct layout based on screen size
  const activeLayout = isMobile ? layoutConfig.mobile : layoutConfig.desktop;

  useEffect(() => {
    fetch("/data/team-data.json")
      .then((res) => res.json())
      .then((data) => setTeamData(data.slice(0, 10)))
      .catch((error) => console.error("Failed to fetch team data:", error));
  }, []);

  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.01 && selectedMember) {
      setSelectedMember(null);
    }
  });

  // --- Scroll stop detection logic (no changes needed) ---
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollYProgress, "change", () => {
    setIsScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 150);
  });

  useEffect(() => {
    if (isScrolling) {
      document.body.classList.add("scrolling-no-events");
    } else {
      document.body.classList.remove("scrolling-no-events");
    }
    return () => document.body.classList.remove("scrolling-no-events");
  }, [isScrolling]);
  // --- End of scroll stop logic ---

  const handleSelectMember = (member: Member) => {
    setSelectedMember((prev) => (prev?.id === member.id ? null : member));
  };

  const isAnyMemberHovered = hoveredMemberId !== null;
  const listTitlesOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);

  const cardVariants = {
    hidden: { opacity: 0, x: "50%" },
    visible: { opacity: 1, x: "0%" },
    exit: { opacity: 0, x: "50%" },
  };
  const { navbarPosition } = useNavbar();

  // 2. Tambahkan state 'mounted' untuk melacak status render di klien
  const [mounted, setMounted] = useState(false);

  // 3. Gunakan useEffect untuk mengubah 'mounted' menjadi true setelah render pertama di klien
  useEffect(() => {
    setMounted(true);
  }, []);

  const marginClasses = {
    top: "pt-[100px]",
    left: "pl-[100px]",
    right: "pr-[100px]",
    bottom: "", // Tambahkan 'bottom' untuk konsistensi
  };

  const appliedMarginClass = mounted
    ? marginClasses[navbarPosition]
    : marginClasses.top;

  return (
    <div className={`bg-background`}>
      <div ref={scrollContainerRef} className="p-10 m-10 relative h-[200vh]">
        <div className="sticky top-1 lg:py-5 lg:h-[180vh] h-[100vh] flex flex-row justify-center items-center">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            }}
            className="absolute top-[2%] left-0 right-0 text-center z-10"
          >
            <h2 className="text-xl font-bold">
              Research Groups & Specializations
            </h2>
          </motion.div>

          <div
            className={`${appliedMarginClass} top-0 lg:top-0 left-0 right-0 bottom-0 absolute justify-center items-center`}
          >
            <motion.div
              style={{ opacity: listTitlesOpacity }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <div className="relative w-full h-full mx-auto">
                {/* REFACTOR: Simplified title rendering loop */}
                {groupTitlesData.map((title) => {
                  const writingModeClass =
                    !isMobile && title.verticalOnDesktop
                      ? `[writing-mode:vertical-${title.verticalOnDesktop}]`
                      : "";
                  return (
                    <motion.h4
                      key={title.id}
                      style={
                        activeLayout.groupTitlePositions[
                          title.positionKey as keyof typeof activeLayout.groupTitlePositions
                        ]
                      }
                      className={`absolute top-1/2 left-1/2 font-semibold  text-lg lg:text-lg ${writingModeClass}`}
                    >
                      {title.text}
                    </motion.h4>
                  );
                })}
              </div>
            </motion.div>

            <div className="relative w-full h-full top-0">
              {teamData.map((member, index) => (
                <TransformingMember
                  key={member.id}
                  member={member}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  isSelected={selectedMember?.id === member.id}
                  isAnyMemberSelected={selectedMember !== null}
                  isHovered={hoveredMemberId === member.id}
                  isAnyMemberHovered={isAnyMemberHovered}
                  onPointerEnter={() =>
                    !selectedMember && setHoveredMemberId(member.id)
                  }
                  onPointerLeave={() =>
                    !selectedMember && setHoveredMemberId(null)
                  }
                  onClick={() => handleSelectMember(member)}
                  // REFACTOR: Pass responsive positions as props
                  startPosition={activeLayout.pyramidPositions[index]}
                  endPosition={activeLayout.listPositions[index]}
                />
              ))}
            </div>

            <AnimatePresence>
              {selectedMember && (
                // 1. Container utama sebagai backdrop dan wadah flex untuk centering
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-30 flex justify-center items-center p-4"
                  onClick={() => setSelectedMember(null)} // Klik di area backdrop akan menutup kartu
                >
                  {/* 2. Kartu informasi di dalamnya, posisinya diatur oleh flex parent */}
                  <motion.div
                    className="relative w-full max-w-sm" // Anda bisa sesuaikan max-w-sm jika perlu
                    variants={cardVariants} // Varian animasi Anda tetap bisa digunakan
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam kartu ikut menutup modal
                  >
                    <TeamInfoCard
                      member={selectedMember}
                      onClose={() => setSelectedMember(null)}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
