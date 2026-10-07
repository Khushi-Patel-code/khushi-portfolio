"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ViewProvider, useView } from "./components/ViewContext";
import SoftwareTemplate from "./templates/SoftwareTemplate";
import UxTemplate from "./templates/UxTemplate";

function Site() {
  const { view } = useView();
  // landing on a view always starts at its top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {view === "software" ? <SoftwareTemplate /> : <UxTemplate />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <ViewProvider>
      <Site />
    </ViewProvider>
  );
}
