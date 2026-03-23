
import Link from "next/link"
import { Fragment, useMemo } from "react"
import { useState, useEffect } from "react"

type BreadcrubProps = {
    text?: any,
    paths: any[]
}

export const Breadcrumb = ({ paths, text }: BreadcrubProps) => {
  const [Category, setCategory] = useState();

  useEffect(() => {
    const filteredPaths = paths.filter(Boolean);
    if (filteredPaths.length > 1) {
      setCategory(filteredPaths[filteredPaths.length - 2]);
    }
  }, [paths]);

  return (
    <div className="bg-[#F6F6F6]">
      <section
        style={{
          margin: "0 auto",
          width: "90%",
          maxWidth: "100%",
          zIndex: 51,
        }}
        className="flex flex-col bg-[#F6F6F6]"
      >
        <div className="flex gap-2 text-sm py-4 flex-wrap">
          <Link href="/" className="underline hover:text-[#F25E26]">
            Home{" "}
          </Link>

          {paths?.map((path: string, index: number) => (
            <Fragment key={index}>
              {index >= 0 && paths[index] !== null && <span>&gt; </span>}
              {index < paths.length - 2 ? (
                <Link
                  href={`/${paths
                    .slice(0, index + 1)
                    .map((p) => p.toLowerCase())
                    .join("/")}`}
                  className="underline hover:text-[#F25E26]"
                >
                  {path}
                </Link>
              ) : (
                <span className="text-[#F25E26]">{path}</span>
              )}
            </Fragment>
          ))}
        </div>
        <div>
          <p className="capitalize text-xl pb-4">{Category}</p>
        </div>
      </section>
    </div>
  );
};


export const DefaultBreadCrumb = ({ paths }: BreadcrubProps) => {
    return (
        <section>
            <div className="flex gap-2 text-sm container pb-4">
                <Link href="/" className="underline hover:text-[#F25E26]">Home</Link>
                {paths?.map((path: string, index: number) => (
                    <Fragment key={index}>
                        <span>&gt;</span>
                        <Link
                            href={`/${paths.slice(0, index + 1).join("/")}`}
                            className="text-[#F25E26] capitalize"
                        >
                            {path}
                        </Link>
                    </Fragment>
                ))}
            </div>
        </section>
    )
}


export const ProductBreadcrumb = ({ paths, text }: BreadcrubProps) => {
  const filteredPaths = useMemo(() => paths.filter(Boolean), [paths]);

  const category = useMemo(() => {
    if (filteredPaths.length > 0) {
      return filteredPaths[filteredPaths.length - 1];
    }
    return "";
  }, [filteredPaths]);

  return (
    <div className="bg-[#F6F6F6]">
      <section
        style={{
          margin: "0 auto",
          width: "90%",
          maxWidth: "100%",
          zIndex: 51,
        }}
        className="flex flex-col bg-[#F6F6F6]"
      >
        {/* Mobile: clean compact header */}
        <div className="flex flex-col items-center gap-1 py-4 sm:hidden">
          <h1 className="font-Poppins text-base font-semibold text-[#1B1B1A]">
            Product Details
          </h1>
          {category && (
            <span className="font-Poppins text-xs text-[#F25E26] capitalize">{category}</span>
          )}
        </div>

        {/* Desktop: original breadcrumb trail */}
        <div className="hidden sm:flex gap-2 text-sm py-4 flex-wrap">
          <span className="text-[#777]">Home</span>
          {filteredPaths.map((segment: string, index: number) => {
            const isLast = index === filteredPaths.length - 1;
            return (
              <Fragment key={index}>
                <span className="text-[#C0C0C0]">/</span>
                <span className={isLast ? "font-medium text-[#F25E26]" : "text-[#777]"}>
                  {segment}
                </span>
              </Fragment>
            );
          })}
        </div>

        {category && (
          <div className="hidden sm:block pb-4">
            <p className="capitalize text-xl text-[#1B1B1A]">{category}</p>
          </div>
        )}

        <div className="hidden sm:flex bg-[#F6F6F6] py-4 justify-center items-center">
          <h1 className="text-center text-base md:text-[20px] font-semibold font-Poppins text-[#1B1B1A]">
            Product Details
          </h1>
        </div>
      </section>
    </div>
  );
};
