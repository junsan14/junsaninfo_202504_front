import RequireAuth from '@/hooks/RequireAuth'

const AdminLayout = ({ children }) => { 

    return (
            <RequireAuth>
                {children}
            </RequireAuth>
    )
}

export const metadata = {
    title: 'Admin',
}

export default AdminLayout
