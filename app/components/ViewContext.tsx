"use client";

import React, { createContext, useContext, useState } from "react";

export type View = "ux" | "software";

const ViewContext = createContext<{ view: View; setView: (v: View) => void }>({
  view: "software",
  setView: () => {},
});

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("software");
  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
}

export const useView = () => useContext(ViewContext);
