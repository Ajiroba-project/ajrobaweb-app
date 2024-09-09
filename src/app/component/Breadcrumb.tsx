
import Link from "next/link"
import path from "path"
import { Fragment } from "react"
import { useState, useEffect } from "react"

type BreadcrubProps = {
    text?: any,
    paths: any[]

}

export const Breadcrumb = ({ paths, text }: BreadcrubProps) => {
  const [Category, setCategory] = useState();

  useEffect(() => {
    if (paths.length > 0) {
      setCategory(paths[paths.length - 2]);
    }
  }, [paths]);

  console.log(paths, 'pathsss')
console.log(paths[0 + 1], '0')
console.log(paths[0 + 2], '1')
console.log(paths[0 + 3], '2')


  return (
    <div className="bg-[#F6F6F6]">
      <section
        style={{
          margin: "0 auto",
          width: "90%",
          maxWidth: "100%",
          zIndex: 51,
        }}
        className={` flex flex-col bg-[#F6F6F6] `}
      >
        <div className=" flex gap-2 text-sm  py-4  flex-wrap">
          <Link href="/" className="underline hover:text-[#F25E26]">
            Home{" "}
          </Link>

          {paths?.map((path: string, index: number) => (
            <Fragment key={index}>

            {/*   {  index < paths.length - 0 && <span>&gt; </span>} */}
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
        <div className="">
          <p className={` capitalize text-xl pb-4`}>{Category}</p>
        </div>
      </section>
    </div>
  );
};


export const DefaultBreadCrumb = ({ paths }: BreadcrubProps) => {
    return (
        <section className={``}>
            <div className=" flex gap-2 text-sm container pb-4">
                <Link href="/" className="underline hover:text-[#F25E26]">Home  </Link>
                {
                    paths?.map((path: string, index: number) => (
                        <Fragment key={index}>
                            <span> {`>`}  </span>
                            <Link
                                href={`/${paths.slice(0, index + 1).join("/")}`}
                                className={` text-[#F25E26] capitalize`}
                            >
                                {path}
                            </Link>
                        </Fragment>
                    ))
                }

            </div>

        </section>
    )
}


export const ProductBreadcrumb = ({ paths, text }: BreadcrubProps) => {
    const [Category, setCategory] = useState()

    useEffect(() => {


        if (paths.length > 0) {
            setCategory(paths[paths.length - 2]);
        }
    }, [paths])

    return (


       <div className="bg-[#F6F6F6]" >
          <section style={{
        margin: '0 auto',
        width: '90%',
        maxWidth: '100%',
        zIndex: 51
      }}  className={` flex flex-col bg-[#F6F6F6] `}>
              <div  className=" flex gap-2 text-sm  py-4  flex-wrap">
                <Link href="/" className="underline hover:text-[#F25E26]">Home  </Link>

                {/*  {
                    paths?.map((path: string, index: number) => (
                        <Fragment key={index}>
                           {index < paths.length - 1 && <span>&gt; </span>}
                            <Link
                                href={`/${paths.slice(0, index + 1).join("/")}`}
                              className={`underline hover:text-[#F25E26] ${index === paths.length - 2 ? " no-underline text-[#F25E26]" : ""}`}

                            >
                                {path}

                            </Link>


                        </Fragment>
                    ))
                } */}

                {
    paths?.map((path: string, index: number) => (
        <Fragment key={index}>
            {/* Render '>' separator except for the last item */}
            {index < paths.length - 1 && <span>&gt; </span>}

            {/* Render link for all items except the last one */}
            {index < paths.length - 2 ? (
                <Link
                  /*   href={`/${paths.slice(0, index + 1).join("/")}`} */
                   href={`/${paths.slice(0, index + 1).map(p => p.toLowerCase()).join("/")}`}
                    className="underline hover:text-[#F25E26]"
                >
                    {path}
                </Link>
            ) : (
                /* Render plain text for the last item */
                <span className="text-[#F25E26]">{path}</span>
            )}
        </Fragment>
    ))
}




            </div>
            <div className="">
                <p className={` capitalize text-xl pb-4`}>{Category}</p>
            </div>

        </section>
      </div>
    )
}
