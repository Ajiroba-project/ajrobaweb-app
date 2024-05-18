
import Link from "next/link"
import { Fragment } from "react"
import { useState, useEffect } from "react"

type BreadcrubProps = {
    text?: any,
    paths: any[]

}

export const Breadcrumb = ({ paths, text }: BreadcrubProps) => {
    const [Category, setCategory] = useState()

    useEffect(() => {


        if (paths.length > 0) {
            setCategory(paths[paths.length - 2]);
        }
    }, [paths])

    return (
        <section className={` bg-[#F6F6F6] -mt-8`}>
            <div className=" flex gap-2 text-sm container py-4  flex-wrap">
                <Link href="/" className="underline hover:text-[#F25E26]">Home  </Link>
                {
                    paths?.map((path: string, index: number) => (
                        <Fragment key={index}>
                            <span> {`>`} </span>
                            <Link
                                href={`/${paths.slice(0, index + 1).join("/")}`}
                                className={` underline hover:text-[#F25E26] `}
                            >
                                {path}
                                {/* {console.log(path)} */}
                            </Link>
                        </Fragment>
                    ))
                }

            </div>
            <div className="container mb-4">
                <p className={` capitalize text-xl pb-4`}>{Category}</p>
            </div>

        </section>
    )
}

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