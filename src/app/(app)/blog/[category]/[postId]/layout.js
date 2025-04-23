
//import  { Metadata, ResolvingMetadata } from 'next'


const PageLayout = ({ children,params }) => { 
    console.log(params)
    return (
            <>
                {children}
            </>
    )
}

export const metadata = {
    title: "ss",
}

export default PageLayout
