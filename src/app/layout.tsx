// src/app/layout.tsx
import React from "react";
export const metadata = {
  title: "HEXCELERATE",
  description: "Empowering Smarter Hiring with AI-Enhanced LinkedIn Insights",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
    <body>
      {children}
    </body>
    </html>
  );
};

export default RootLayout;
