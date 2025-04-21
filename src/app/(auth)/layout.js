import AuthCard from '@/app/(auth)/AuthCard'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
    title: 'Admin',
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="text-gray-900 antialiased">
            <NextTopLoader />
                <AuthCard>
                    {children}
                </AuthCard>
            </div>
        </div>
    )
}

export default Layout
