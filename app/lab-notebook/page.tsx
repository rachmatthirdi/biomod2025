"use client";

import { useState, useMemo, useRef, useEffect, type ReactNode } from "react";
import Fuse, {
  type IFuseOptions,
  type FuseResult,
  type FuseResultMatch,
} from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchIcon, ChevronRightIcon, XIcon, InfoIcon } from "lucide-react";

// ====================================================================
// 1. DEFINISI TIPE & DATA
// ====================================================================
interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

const ALL_DATA: SearchItem[] = [
  {
    id: "item-1",
    title: "Pengantar Bioteknologi Modern",
    category: "Sains",
    image: "/team/team.png",
    description:
      "Mempelajari dasar-dasar dan aplikasi bioteknologi terkini. Teknologi ini dapat digunakan untuk berbagai keperluan.",
    content:
      "Bioteknologi adalah pemanfaatan sistem biologi, organisme hidup, atau turunannya untuk membuat produk. Dengan teknologi ini, kita dapat menghasilkan obat-obatan.\n\nAplikasi modern mencakup rekayasa genetika, produksi obat-obatan, pertanian, dan lingkungan.",
  },
  {
    id: "item-2",
    title: "Algoritma Kecerdasan Buatan Terapan",
    category: "Teknologi",
    image: "",
    description:
      "Menyelami algoritma AI yang digunakan dalam industri. Teknologi AI dapat memprediksi tren pasar.",
    content:
      "Kecerdasan Buatan (AI) adalah cabang ilmu komputer. Algoritma AI sering ditemukan dalam sistem rekomendasi (Netflix, Amazon), mobil otonom, dan deteksi penipuan.\n\nInovasi dalam bidang ini meliputi pertanian vertikal, hidroponik, aeroponik, penggunaan drone untuk pemantauan tanaman, dan pengembangan tanaman.",
  },
  {
    id: "item-3",
    title: "Aspek Etika dalam Riset Genetik",
    category: "ELSI",
    image: "",
    description:
      "Menganalisis isu-isu etika, legal, dan sosial terkait genetika dan teknologi.",
    content:
      "ELSI (Ethical, Legal, and Social Implications) adalah bidang studi yang meneliti dampak dari penelitian ilmiah dan teknologis, khususnya di bidang genetika.\n\nDalam riset genetik, isu-isu ELSI mencakup privasi data genetik dan diskriminasi.",
  },
];

// ====================================================================
// 2. KONFIGURASI PENCARIAN
// ====================================================================
const PRIMARY_FUSE_OPTIONS: IFuseOptions<SearchItem> = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "description", weight: 0.5 },
    { name: "content", weight: 0.3 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  findAllMatches: true,
  includeMatches: true,
};

const RECOMMENDATION_FUSE_OPTIONS: IFuseOptions<SearchItem> = {
  ...PRIMARY_FUSE_OPTIONS,
  threshold: 0.6,
};

// ====================================================================
// 3. FUNGSI & KOMPONEN HELPER
// ====================================================================

interface HighlightProps {
  text: string;
  matches?: readonly FuseResultMatch[];
  type: "full" | "snippet";
  maxLength?: number;
}
function Highlight({ text, matches, type, maxLength = 120 }: HighlightProps) {
  if (!matches || matches.length === 0) {
    if (type === "snippet" && text.length > maxLength) {
      return <>{text.substring(0, maxLength)}...</>;
    }
    return <>{text}</>;
  }

  let textToRender = text;
  let adjustedIndices: [number, number][] = matches.flatMap(
    (match) => match.indices
  );
  let prefix = "";
  let suffix = "";

  if (type === "snippet" && text.length > maxLength) {
    const firstMatchIndex = adjustedIndices[0][0];
    const halfLength = Math.floor(maxLength / 2);
    let start = Math.max(0, firstMatchIndex - halfLength);
    let end = Math.min(text.length, firstMatchIndex + halfLength);

    if (end - start < maxLength) start = Math.max(0, end - maxLength);
    if (end - start < maxLength) end = Math.min(text.length, start + maxLength);

    const offset = start;
    textToRender = text.substring(start, end);

    adjustedIndices = adjustedIndices
      .map(([s, e]) => [s - offset, e - offset] as [number, number])
      .filter(([s, e]) => s >= 0 && e < textToRender.length);

    if (start > 0) prefix = "... ";
    if (end < text.length) suffix = " ...";
  }

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  adjustedIndices
    .sort((a, b) => a[0] - b[0])
    .forEach(([start, end]) => {
      if (start > lastIndex)
        parts.push(
          <span key={`part-${parts.length}`}>
            {textToRender.substring(lastIndex, start)}
          </span>
        );
      parts.push(
        <span
          key={`match-${parts.length}`}
          className="bg-yellow-300/50 rounded-[3px]"
        >
          {textToRender.substring(start, end + 1)}
        </span>
      );
      lastIndex = end + 1;
    });

  if (lastIndex < textToRender.length)
    parts.push(
      <span key={`part-${parts.length}`}>
        {textToRender.substring(lastIndex)}
      </span>
    );

  return (
    <>
      {prefix}
      {parts}
      {suffix}
    </>
  );
}

const highlightText = (text: string, highlightQuery?: string): ReactNode => {
  if (!highlightQuery || !text) return <>{text}</>;
  const regex = new RegExp(`(${highlightQuery})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === highlightQuery.toLowerCase() ? (
      <span key={index} className="bg-yellow-300/50 rounded-[3px]">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

// Di dalam file SearchLayout.tsx

// Ganti fungsi createMatchesForField Anda yang lama dengan yang ini:
const createMatchesForField = (
  text: string,
  query: string,
  key: keyof SearchItem
): FuseResultMatch[] => {
  const matches: FuseResultMatch[] = [];
  if (!query) return matches;

  const regex = new RegExp(query, "gi");
  let match;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length - 1;

    // PERBAIKAN DI SINI:
    // Kita buat variabel `rangeTuple` dengan tipe [number, number] secara eksplisit
    const rangeTuple: [number, number] = [start, end];

    matches.push({
      indices: [rangeTuple], // Gunakan tuple yang sudah kita definisikan
      key: key,
      value: text,
    });
  }

  return matches;
};

function DetailPanel({
  data,
  activeItemId,
  query,
}: {
  data: SearchItem[];
  activeItemId: string | null;
  query?: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeItemId && scrollContainerRef.current) {
      const element = document.getElementById(activeItemId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeItemId]);

  return (
    <div
      ref={scrollContainerRef}
      className="hidden lg:block w-full lg:w-2/3 h-full overflow-y-auto border-l border-gray-200 dark:border-gray-700 custom-scrollbar"
    >
      <div className="p-8">
        {data.map((item) => (
          <motion.div
            key={item.id}
            id={item.id}
            className={`py-8 px-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 rounded-md ${
              activeItemId === item.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
            }`}
            initial={{ opacity: 0.8 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">
              {highlightText(item.title, query)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {item.category}
            </p>
            {item.image && (
              <div className="relative w-full h-64 my-6 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={item.image}
                  alt={`Gambar untuk ${item.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            <Card className="mb-6 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Deskripsi Singkat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {highlightText(item.description, query)}
                </CardDescription>
              </CardContent>
            </Card>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {item.content.split("\n\n").map((p, i) => (
                <p key={i}>{highlightText(p, query)}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ====================================================================
// 4. KOMPONEN UTAMA
// ====================================================================
export default function SearchLayout() {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);
  const [showAllResults, setShowAllResults] = useState(false);

  const fuse = useMemo(() => new Fuse(ALL_DATA, PRIMARY_FUSE_OPTIONS), []);
  const recommendationFuse = useMemo(
    () => new Fuse(ALL_DATA, RECOMMENDATION_FUSE_OPTIONS),
    []
  );

  const searchData = useMemo(() => {
    if (!query) {
      return {
        results: ALL_DATA.map((item, index) => ({
          item,
          matches: [],
          score: 1,
          refIndex: index,
        })),
        recommendations: [],
      };
    }
    const lowerCaseQuery = query.toLowerCase();

    const exactPhraseResults = ALL_DATA.map((item, refIndex) => ({
      item,
      refIndex,
    })).filter(
      ({ item }) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.content.toLowerCase().includes(lowerCaseQuery)
    );

    if (exactPhraseResults.length > 0) {
      const formattedResults = exactPhraseResults.map(({ item, refIndex }) => {
        const matches: FuseResultMatch[] = [];
        if (item.title.toLowerCase().includes(lowerCaseQuery))
          matches.push(...createMatchesForField(item.title, query, "title"));
        if (item.description.toLowerCase().includes(lowerCaseQuery))
          matches.push(
            ...createMatchesForField(item.description, query, "description")
          );
        if (item.content.toLowerCase().includes(lowerCaseQuery))
          matches.push(
            ...createMatchesForField(item.content, query, "content")
          );
        return { item, matches, score: 0, refIndex };
      });
      return { results: formattedResults, recommendations: [] };
    }

    const fuzzyResults = fuse.search(query);
    if (fuzzyResults.length > 0) {
      return { results: fuzzyResults, recommendations: [] };
    }

    const recommendedResults = recommendationFuse.search(query);
    return { results: [], recommendations: recommendedResults };
  }, [query, fuse, recommendationFuse]);

  const displayedResults = showAllResults
    ? searchData.results
    : searchData.results.slice(0, 3);
  const displayedRecommendations = showAllResults
    ? searchData.recommendations
    : searchData.recommendations.slice(0, 3);

  useEffect(() => {
    if (!selectedItem && ALL_DATA.length > 0) setSelectedItem(ALL_DATA[0]);
  }, []);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (resultsContainerRef.current)
      resultsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setShowAllResults(false);
  }, [query]);

  const renderResultItem = (
    result:
      | FuseResult<SearchItem>
      | {
          item: SearchItem;
          matches: FuseResultMatch[];
          score: number;
          refIndex: number;
        }
  ) => {
    const { item, matches } = result;
    const titleMatches = matches?.filter((m) => m.key === "title");
    const descriptionMatches = matches?.filter((m) => m.key === "description");
    const contentMatches = matches?.filter((m) => m.key === "content");

    const hasDescriptionMatch =
      descriptionMatches && descriptionMatches.length > 0;
    const textForSnippet = hasDescriptionMatch
      ? item.description
      : item.content;
    const matchesForSnippet = hasDescriptionMatch
      ? descriptionMatches
      : contentMatches;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
          selectedItem?.id === item.id
            ? "bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-600 shadow-md"
            : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600"
        }`}
        onClick={() => setSelectedItem(item)}
      >
        <h3 className="font-semibold text-lg">
          <Highlight text={item.title} matches={titleMatches} type="full" />
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.category}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          <Highlight
            text={textForSnippet}
            matches={matchesForSnippet}
            type="snippet"
          />
        </p>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full lg:w-1/3 flex flex-col p-6 border-r border-gray-200 dark:border-gray-700 overflow-hidden h-full">
        <h2 className="text-3xl font-bold mb-6 flex items-center shrink-0">
          <SearchIcon className="h-7 w-7 mr-3 text-blue-500" />
          Cari Riset & Spesialisasi
        </h2>
        <div className="relative mb-6 shrink-0">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik kata kunci..."
            className="w-full pl-10 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
        </div>
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
        >
          <AnimatePresence mode="wait">
            {searchData.results.length > 0 ? (
              <motion.div key="results-list" className="space-y-3">
                {displayedResults.map(renderResultItem)}
              </motion.div>
            ) : (
              <motion.div
                key="no-results-area"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {query ? (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>Pencarian tidak ditemukan untuk "{query}".</p>
                    {searchData.recommendations.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-center mb-3">
                          Berikut rekomendasi yang mungkin Anda maksud:
                        </h4>
                        <div className="space-y-3">
                          {displayedRecommendations.map(renderResultItem)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    <p>Mulai ketik untuk mencari...</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {searchData.results.length > 3 && !showAllResults && (
            <div className="mt-4 text-center">
              <Button
                onClick={() => setShowAllResults(true)}
                variant="outline"
                className="w-full dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Tampilkan {searchData.results.length - 3} hasil lainnya
              </Button>
            </div>
          )}
          {searchData.recommendations.length > 3 &&
            !showAllResults &&
            searchData.results.length === 0 && (
              <div className="mt-4 text-center">
                <Button
                  onClick={() => setShowAllResults(true)}
                  variant="outline"
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Tampilkan {searchData.recommendations.length - 3} rekomendasi
                  lainnya
                </Button>
              </div>
            )}
          {showAllResults &&
            (searchData.results.length > 3 ||
              (searchData.results.length === 0 &&
                searchData.recommendations.length > 3)) && (
              <div className="mt-4 text-center">
                <Button
                  onClick={() => setShowAllResults(false)}
                  variant="outline"
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Sembunyikan hasil tambahan
                </Button>
              </div>
            )}
        </div>
      </div>

      <DetailPanel
        data={ALL_DATA}
        activeItemId={selectedItem?.id || null}
        query={query}
      />
    </div>
  );
}
