import React from "react";
export default ({
    children,
    className
}: Readonly<{
    children: React.ReactNode;
    className: string
}>) => (
    <div className={`fixed flex justify-center items-center w-screen h-screen overflow-hidden ${className}`}>
        {children}
    </div>
)