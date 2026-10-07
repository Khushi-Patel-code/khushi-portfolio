"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ViewProvider, useView } from "./components/ViewContext";
import MinimalTemplate from "./templates/MinimalTemplate";

function Site() {
  const { view } = useView();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MinimalTemplate />
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
